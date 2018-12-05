'use strict';

const ResourceController = require('./resource');

class ServerController extends ResourceController {
  async index() {
    const { service } = this;
    const all_servers = (await service.gm.server.getAllServerList()).server_items;
    this.success({ all_servers });
    // const work_servers = await service.gm.server.getWorkServerList();
    // this.success({ all_servers, work_servers });
  }

  async getOnlineNumber() {
    const { service } = this;
    const { servers } = await service.gm.server.getOnlineInSwitchReq();
    this.success(servers);
  }
}

module.exports = ServerController;
