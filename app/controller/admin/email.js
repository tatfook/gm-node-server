'use strict';

const _ = require('lodash');
const ResourceController = require('./resource');

class EmailController extends ResourceController {

  async search() {
    await this.ensureAdmin();
    const query = this.ctx.request.body || {};

    this.formatQuery(query);

    const list = await this.ctx.model.Email.findAndCount({ ...this.queryOptions, where: query, include: [{ model: this.ctx.model.User, as: 'users' }] });
    const rows = list.rows.map(async row => await this.ctx.model.Email.entity(row));

    list.rows = await Promise.all(rows);
    this.success(list);
  }

  async update() {
    await this.ensureAdmin();
    const { ctx } = this;
    const params = ctx.request.body;
    const id = _.toNumber(ctx.params.id);

    if (!id) ctx.throw(400, 'args error');

    const data = await this.ctx.model.Email.update(params, { individualHooks: true, where: { id } });

    return this.success(await this.entity(data));
  }

  async send() {
    await this.ensureAdmin();
    const { ctx } = this;
    const params = ctx.request.body;
    const id = _.toNumber(ctx.params.id);

    if (!id) ctx.throw(400, 'args error');

    const data = await this.ctx.model.Email.update(params, { individualHooks: true, where: { id } });

    return this.success(await this.entity(data));
  }
}

module.exports = EmailController;
