'use strict';

const Subscription = require('egg').Subscription;

class saveMaxOnlineNumber extends Subscription {
  async loadMaxOnlineNumberFromDB(date) {
    const { ctx } = this;
    const [ online ] = await ctx.model.Online
      .findOrCreate({ where: { date }, defaults: {} });
    return online.max;
  }

  async getCurrentOnlineNumber() {
    const { service } = this.ctx;
    const { servers } = await service.gm.server
      .getOnlineInSwitchReq();
    let total_online_number = 0;
    for (const server of servers) {
      total_online_number += server.online_number;
    }
    return total_online_number;
  }

  async saveToDB(max_online_number, date) {
    const { ctx } = this;
    await ctx.model.Online
      .update({ max: max_online_number }, { where: { date } });
  }

  async saveMaxOnlineNumberToDB() {
    const { ctx, loadMaxOnlineNumberFromDB, getCurrentOnlineNumber } = this;
    const date = ctx.helper.getToday();
    const max_online_number = await loadMaxOnlineNumberFromDB(date);
    const current_online_number = await getCurrentOnlineNumber();
    if (current_online_number > max_online_number) {
      await this.saveToDB(current_online_number, date);
    }
  }

  async subscribe() {
    await this.saveMaxOnlineNumberToDB();
  }
}

module.exports = app => {
  saveMaxOnlineNumber.schedule = app.config.server.schedule;
  return saveMaxOnlineNumber;
};
