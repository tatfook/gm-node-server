'use strict';

// const Base64 = require('js-base64').Base64;
const Service = require('egg').Service;

class GmUserService extends Service {
  async queryUser(uid) {
    const client = await this.app.gmClientManager();
    const options = {
      players: {
        uid,
        channel: 0,
      },
    };
    const res = await client.send('gms.GMQueryUserReq', options);
    if (res.data) {
      console.log('user list: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }

  async queryOnlineUser(options) {
    const client = await this.app.gmClientManager();
    const res = await client.send('gms.GMQueryUserOnlineReq', options);
    if (res.data) {
      console.log('online user list: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }

  async kickUser(uid) {
    const client = await this.app.gmClientManager();
    const res = await client.send('gms.GMKickUserReq', { uid });
    if (res.data) {
      console.log('kick user: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }

  async getServerOnlineUsers(serverId) {
    const client = await this.app.gmClientManager();
    const res = await client.send('gms.GMQueryAllUserBaseInfoOnlineReq', {
      server_id: serverId,
    });
    if (res.data) {
      console.log('online user: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }
}

module.exports = GmUserService;
