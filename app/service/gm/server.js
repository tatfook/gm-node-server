'use strict';

// const Base64 = require('js-base64').Base64;
const Service = require('egg').Service;

class GmServerService extends Service {
  async getAllServerList() {
    const client = await this.app.gmClientManager();
    const res = await client.send('gms.GMGetAllServerListReq', {});
    if (res.data) {
      console.log('server list: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }

  async getWorkServerList() {
    const client = await this.app.gmClientManager();
    const res = await client.send('gms.GMGetWorkAllServerListReq', {});
    if (res.data) {
      console.log('work server list: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }

  async getServerRegisterNumber(options) {
    const client = await this.app.gmClientManager();
    const res = await client.send('gms.GMGetServerRegisterNumberReq', options);
    if (res.data) {
      console.log('Server Register Number: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }
}

module.exports = GmServerService;
