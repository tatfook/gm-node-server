'use strict';

const ResourceController = require('./resource');

class ServerController extends ResourceController {
  async index() {
    const { service } = this;
    const all_servers = (await service.gm.server.getAllServerList()).server_items;
    const online = (await service.gm.server.getOnlineInSwitchReq()).servers;
    this.success({ all_servers, online });
    // const work_servers = await service.gm.server.getWorkServerList();
    // this.success({ all_servers, work_servers });
  }

  dateFilter() {
    const { ctx } = this;
    let { from, to } = ctx.params;
    if (!to && !from) {
      to = ctx.helper.getToday();
      from = ctx.helper.getDateBefore(1, 'months');
    }
    return { gte: from, lte: to };
  }

  async online() {
    const { service } = this;
    const { servers } = await service.gm.server.getOnlineInSwitchReq();
    this.success(servers);
  }

  async maxOnline() {
    const { ctx } = this;
    const date_query = this.dateFilter();
    const online_numbers = await ctx.model.Online.findAll({
      where: { date: date_query },
    });
    this.success(online_numbers);
  }
}

module.exports = ServerController;
