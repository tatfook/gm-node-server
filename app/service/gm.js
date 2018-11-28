'use strict';

// const Base64 = require('js-base64').Base64;
const Service = require('egg').Service;

class HallService extends Service {
  async unsendMail() {
    const client = await this.app.gmClientManager();
    const res = await client.sendMessage('gms.GMCheckSessionReq', {});
    if (res.data) {
      console.log('unsendMail: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }
}

module.exports = HallService;
