'use strict';
const net = require('net');
const ProtoBuf = require('protobufjs');
const Base64 = require('js-base64').Base64;
const md5 = require('blueimp-md5');

const Root = ProtoBuf.Root.fromJSON(require('../../proto/bundle.json'));
const CSMessageHeader = Root.lookupType('CSMessageHeader');
const queue = require('async/queue');

class HallClient {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.callbackMap = new Map();
    this.session;
    const sleep = n => new Promise(resolve => setTimeout(resolve, n));
    this.messageQueue = new queue(async (data, next) => {
      this.send(data);
      await sleep(0);
      next();
    });
  }

  async init(options) {
    this.client = net.Socket();
    await this.client.connect({
      host: this.host,
      port: this.port,
    });
    this.client.on('data', data => this.parseFeedback(data));
    this.isLogin = await this.login(options);
    console.log('isLogin: ', this.isLogin);
  }

  async checkSession(options) {
    const res = await this.sendMessage('gms.GMCheckSessionReq', options);
    if (res.data) {
      return res.data.random_bytes.toString();
    }
    throw res.error;
  }

  async login(options) {
    const secrect = await this.checkSession({
      name: Base64.encode(options.username),
    });
    const reqData = {
      random_bytes: Base64.encode(secrect),
      encrypt_bytes: Base64.encode(md5(options.username + options.password + secrect)),
    };
    const res = await this.sendMessage('gms.GMLoginReq', reqData);
    if (res.data) {
      return true;
    }
    throw res.error;
  }

  async send(message) {
    this.client.write(message);
  }

  async parseFeedback(data) {
    try {
      const {
        headerBuf,
        rspBuf,
      } = await this.decode(data);
      const rspHeader = CSMessageHeader.decode(headerBuf);
      const seqNum = rspHeader.seq_num.toString();
      if (!this.session) this.session = rspHeader.gateway_session;
      const callback = this.callbackMap.get(seqNum);
      this.callbackMap.delete(seqNum);
      if (!callback) {
        console.error('Missing callback for seqNum: ', seqNum);
        return;
      }
      if (rspHeader.errcode) {
        return callback({
          error: new Error('Game Server Error: ' + rspHeader.errcode),
        });
      }
      const rspClassName = rspHeader.msg_name.toString();
      console.log(`Callback type: ${rspClassName}, seqNum: ${seqNum}`);
      const decoded = Root.lookupType(rspClassName).decode(rspBuf);
      return callback({
        data: decoded,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async encode(msgHeader, reqBuf) {
    const headerBuf = CSMessageHeader.encode(msgHeader).finish();
    const headerLen = headerBuf.length + 4;
    const totalLen = reqBuf.length + headerLen + 4;
    const headerLenBuf = Buffer.allocUnsafe(4);
    headerLenBuf.writeUInt32LE(headerLen);
    const totalLenBuf = Buffer.allocUnsafe(4);
    totalLenBuf.writeUInt32LE(totalLen);
    const message = Buffer.concat([ totalLenBuf, headerLenBuf, headerBuf, reqBuf ]);
    return message;
  }

  async decode(data) {
    const totalLen = data.slice(0, 4).readUInt32LE(0);
    const headerLen = data.slice(4, 8).readUInt32LE(0);
    const headerBuf = data.slice(8, headerLen + 4);
    const rspBuf = data.slice(4 + headerLen, totalLen);
    return {
      headerBuf,
      rspBuf,
    };
  }

  async sendMessage(reqType, reqData) {
    const reqProtoClass = Root.lookupType(reqType);
    if (!reqProtoClass) throw new Error('Invalide reqType: ', reqType);
    const seqNum = this.generateSeqNum();
    const msgHeader = {
      msg_name: Base64.encode(reqType),
      seq_num: seqNum,
    };
    if (this.session) msgHeader.gateway_session = this.session;

    const reqBuf = reqProtoClass.encode(reqData).finish();
    const message = await this.encode(msgHeader, reqBuf);
    this.messageQueue.push(message);
    console.log(`Sending type: ${reqType}, seqNum: ${seqNum}`);
    return new Promise(resolve => this.callbackMap.set(seqNum, data => resolve(data)));
  }

  generateSeqNum() {
    let seqNum = Math.ceil(Math.random() * 1000000);
    while (this.callbackMap.get(seqNum)) {
      seqNum = Math.ceil(Math.random() * 1000000);
    }
    return seqNum.toString();
  }

  waitingListSize() {
    return this.callbackMap.size;
  }
}

module.exports = HallClient;
