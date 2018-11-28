'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async login() {
    const { ctx, service } = this;
    const payload = ctx.params.permit('username', 'password');
    const res = await service.admin.login(payload);
    ctx.helper.success({ ctx, res });
  }

  async logout() {
    const { ctx, service } = this;
    await service.admin.logout();
    ctx.helper.success({ ctx });
  }

  async current() {
    const { ctx, service } = this;
    const res = await service.admin.current();
    ctx.helper.success({ ctx, res });
  }
}

module.exports = AdminController;
