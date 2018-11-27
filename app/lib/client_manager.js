'use strict';

const GMClient = require('./gm_client');
const supportedClients = {
  GMClient,
};

class ClientManager {
  constructor(clientType, host, port, concurrency = 1) {
    this.clientType = clientType;
    this.host = host;
    this.port = port;
    this.concurrency = concurrency;
    this.clients = [];
  }

  async init(options) {
    for (let i = 0; i < this.concurrency; i++) {
      this.clients[i] = new supportedClients[this.clientType](this.host, this.port);
      await this.clients[i].init(options);
    }
  }

  getIdleClient() {
    let index,
      length;
    for (let i = 0; i < this.concurrency; i++) {
      if (length === undefined || length > this.clients[i].waitingListSize) {
        length = this.clients[i].waitingListSize();
        index = i;
      }
    }
    return this.clients[index];
  }

  async send(reqType, reqData) {
    return await this.getIdleClient().sendMessage(reqType, reqData);
  }
}

module.exports = ClientManager;
