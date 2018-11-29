'use strict';

const Base64 = require('js-base64').Base64;
const Service = require('egg').Service;

class GmMailService extends Service {
  async pushMessage(notice) {
    const client = await this.app.gmClientManager();
    const options = {
      server_ids: notice.serverIds,
      push_message: Base64.encode(notice.content),
    };
    const res = await client.send('gms.GMPushMessageReq', options);
    if (res.data) {
      console.log('push message: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }

  async unsendMail() {
    const client = await this.app.gmClientManager();
    const res = await client.send('gms.GMQueryUnsendMailReq', {});
    if (res.data) {
      console.log('unsend Mail: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }

  async checkValidMail() {
    const client = await this.app.gmClientManager();
    const res = await client.send('gms.GMCheckValidMailReq', {});
    if (res.data) {
      console.log('unsend Mail: ', JSON.stringify(res.data));
      return res.data;
    }
    throw res.error;
  }


  async sendMail(mail) {
    const clientManager = await this.app.gmClientManager();
    const client = clientManager.getIdleClient();
    const options = {
      mail_content: {
        gm_uid: client.gmId(),
        addressee_type: mail.addresseeType,
        sender: Base64.encode(mail.sender),
        title: Base64.encode(mail.title),
        content: Base64.encode(mail.content),
        valid_time: mail.validTime || 0,
        mail_type: mail.mailType,
        is_destroy: mail.isDestroy,
        show_priority: mail.showPriority,
        is_popping: mail.isPopping,
        delayed_time: mail.getDelayTime(mail),
      },
    };
    if (mail.addresseeType >= 1) {
      options.mail_content.online_ids = mail.parseOnlineIds(mail);
    }
    if (mail.addresseeType >= 2) {
      options.mail_content.uids = mail.parseUids(mail);
      options.mail_content.channels = [ 0 ];
    }
    if (mail.mailType === 1) {
      console.log('attachments: ', mail.attachments);
      options.mail_content.attachment_list = mail.getAttachments(mail);
    }
    console.log('options: ', options);
    const res = await client.sendMessage('gms.GMSendMailReq', options);
    if (res.data) {
      console.log('send Mail: ', JSON.stringify(res.data));
      return res.data.mail_id.toString();
    }
    throw res.error;
  }
}

module.exports = GmMailService;
