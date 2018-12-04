'use strict';

const _ = require('lodash');
const Controller = require('egg').Controller;
const pluralize = require('pluralize');

class ResourceController extends Controller {
  async parseParams() {
    const params = this.ctx.params || {};
    const resourceName = params.resources || '';
    this.resource = this.ctx.model[_.upperFirst(pluralize.singular(resourceName))];
    if (!this.resource) this.ctx.throw(400, 'args error');
  }

  formatQuery(query) {
    const Op = this.app.Sequelize.Op;
    for (const key in query) {
      const arr = key.split('-');
      if (arr.length !== 2) continue;

      const val = query[key];
      delete query[key];

      const newkey = arr[0];
      const op = arr[1];
      const oldval = query[newkey];

      if (!_.isPlainObject(oldval)) {
        query[newkey] = {};
        if (oldval) {
          query[newkey][Op.eq] = oldval;
        }
      }
      query[newkey][Op[op]] = val;
    }
  }

  get queryOptions() {
    return this.ctx.state.queryOptions;
  }

  currentUser() {
    return this.ctx.state.user.data;
  }

  enauthenticated() {
    const user = this.currentUser();
    if (!user) this.ctx.throw(401, 'unauthenticated');

    return user;
  }

  ensureAdmin() {
    const user = this.enauthenticated();
    if (user.role !== 'admin') this.ctx.throw(403, 'not admin');
  }

  async entity(data) {
    return this.resource.entity ? await this.resource.entity(data) : data;
  }

  success(body, status = 200) {
    this.ctx.status = status;
    this.ctx.body = body;
  }

  failed(status, msg) {
    this.ctx.status = status || 400;
    this.ctx.body = msg;
  }

  async search() {
    await this.ensureAdmin();
    await this.parseParams();
    const query = this.ctx.request.body || {};

    this.formatQuery(query);

    const list = await this.resource.findAndCount({ ...this.queryOptions, where: query });
    const rows = list.rows.map(async row => await this.entity(row));

    list.rows = await Promise.all(rows);
    this.success(list);
  }

  async index() {
    this.ensureAdmin();
    this.parseParams();

    const query = this.ctx.query || {};
    const list = await this.resource.findAndCount(_.merge({}, this.queryOptions, { where: query }));
    const rows = list.rows.map(async row => await this.entity(row));

    list.rows = await Promise.all(rows);
    this.success(list);
  }

  async show() {
    this.ensureAdmin();
    this.parseParams();
    const { ctx } = this;
    const id = _.toNumber(ctx.params.id);

    if (!id) ctx.throw(400, 'args error');

    const data = await this.resource.findOne({ where: { id } });

    return this.success(await this.entity(data));
  }

  async create() {
    this.ensureAdmin();
    this.parseParams();
    const params = this.ctx.request.body;

    const data = await this.resource.create(params, { individualHooks: true });

    return this.success(await this.entity(data));
  }

  async update() {
    this.ensureAdmin();
    this.parseParams();
    const { ctx } = this;
    const params = ctx.request.body;
    const id = _.toNumber(ctx.params.id);

    if (!id) ctx.throw(400, 'args error');

    const data = await this.resource.update(params, { individualHooks: true, where: { id } });

    return this.success(await this.entity(data));
  }

  async destroy() {
    this.ensureAdmin();
    this.parseParams();
    const { ctx } = this;
    const id = _.toNumber(ctx.params.id);

    if (!id) ctx.throw(400, 'args error');

    const data = await this.resource.destroy({ where: { id } });

    return this.success(await this.entity(data));
  }

  async destroyAll() {
    this.ensureAdmin();
    this.parseParams();
    const { ctx } = this;
    const params = ctx.request.body;
    const ids = params.ids || [];

    const data = await this.resource.destroy({ where: { id: ids } });

    return this.success(await this.entity(data));
  }
}

module.exports = ResourceController;
