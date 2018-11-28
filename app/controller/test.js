'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    const { ctx, service } = this;
    const res = await service.gm.unsendMail();
    ctx.helper.success({ ctx, res });
  }
}

module.exports = TestController;
