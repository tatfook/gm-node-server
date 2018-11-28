'use strict';

const Service = require('egg').Service;

class AdminService extends Service {

  async login(payload) {
    const { ctx, service } = this;
    const admin = await ctx.model.Admin.findOne({ where: { username: payload.username } });
    if (!admin) {
      ctx.throw(404, 'admin not found');
    }

    const verifyPsw = await ctx.compare(payload.password, admin.encryptPassword);
    if (!verifyPsw) {
      ctx.throw(404, 'admin password is error');
    }
    // 生成Token令牌
    return { token: await service.admin.applyToken(admin) };
  }

  async applyToken(admin) {
    const { ctx } = this;
    return ctx.app.jwt.sign({
      data: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.secret);
  }

  async logout() {
    // do nothing

  }

  async current() {
    return this.ctx.state.user.data;
  }

}

module.exports = AdminService;
