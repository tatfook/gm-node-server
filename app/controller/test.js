'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    const { ctx, service } = this;
    // const res = await service.gm.server.getWorkServerList();
    // const res = await service.gm.user.getServerOnlineUsers(ctx.params.server_id);
    const res = await service.gm.mail.checkValidMail(ctx.params);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = TestController;
