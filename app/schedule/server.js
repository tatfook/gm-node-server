'use strict';

const Subscription = require('egg').Subscription;

class saveMaxOnlineNumber extends Subscription {
  static get schedule() {
    return {
      // cron: '59 * * * * *',
      cron: '*/5 * * * * *',
      type: 'worker',
    };
  }

  async loadMaxOnlineNumberFromDB(date) {
    const { ctx } = this;
    let online = await ctx.model.Online.findOne({ where: { date } });
    if (!online) online = await ctx.model.Online.create({});
    return online.max;
  }

  async getCurrentOnlineNumber() {
    const { service } = this.ctx;
    const { servers } = await service.gm.server.getOnlineInSwitchReq();
    let total_online_number = 0;
    for (const server of servers) {
      total_online_number = total_online_number + server.online_number;
    }
    return total_online_number;
  }

  async saveToDB(max_online_number, date) {
    const { ctx } = this;
    await ctx.model.Online.update({ max: max_online_number }, { where: { date } });
  }

  async saveMaxOnlineNumberToDB() {
    const { ctx } = this;
    const date = ctx.helper.BeiJingDate();
    const max_online_number = await this.loadMaxOnlineNumberFromDB(date);
    const current_online_number = await this.getCurrentOnlineNumber();
    if (current_online_number > max_online_number) {
      console.log({ current_online_number });
      await this.saveToDB(current_online_number, date);
    }
  }

  async subscribe() {
    await this.saveMaxOnlineNumberToDB();
  }
}

module.exports = saveMaxOnlineNumber;
