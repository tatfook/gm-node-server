'use strict';

const GM_CLIENT_MANAGER = Symbol('Application#gameClientManager');
const ClientManager = require('../lib/client_manager');

// app/extend/application.js
module.exports = {
  async gmClientManager() {
    if (!this[GM_CLIENT_MANAGER]) {
      const conf = this.config.gmClientManager;
      this[GM_CLIENT_MANAGER] = new ClientManager('GMClient', conf.host, conf.port, conf.concurrency);
      await this[GM_CLIENT_MANAGER].init(conf);
    }
    return this[GM_CLIENT_MANAGER];
  },
};
