'use strict';

const _ = require('lodash');
const ResourceController = require('./resource');

class NoticeController extends ResourceController {
  async send() {
    await this.ensureAdmin();
    const { ctx } = this;
    const id = _.toNumber(ctx.params.id);

    if (!id) ctx.throw(400, 'args error');
    const notice = await ctx.model.Notice.findOne({ where: { id } });
    if (notice.status > 0) ctx.throw(400, 'cannot send email with status: ' + notice.status);
    const nid = await ctx.service.gm.mail.pushMessage(notice);
    const data = await notice.update({ status: 1, nid });
    return this.success(data);
  }
}

module.exports = NoticeController;
