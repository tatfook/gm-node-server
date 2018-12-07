'use strict';

const _ = require('lodash');
const ResourceController = require('./resource');

class EmailController extends ResourceController {
  async send() {
    const admin = await this.ensureAdmin();
    const { ctx } = this;
    const id = _.toNumber(ctx.params.id);

    if (!id) ctx.throw(400, 'args error');
    const email = await ctx.model.Email.findOne({ where: { id } });
    if (email.status > 0) ctx.throw(400, 'cannot send email with status: ' + email.status);
    const mid = await ctx.service.gm.mail.sendMail(email);
    const data = await email.update({ status: 1, mid, adminId: admin.id });
    return this.success(data);
  }
}

module.exports = EmailController;
