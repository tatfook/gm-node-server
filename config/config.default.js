'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542790408305_3363';

  // add your config here
  config.middleware = [ 'errorHandler', 'pagination' ];

  config.cors = {
    origin: '*',
  };

  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };

  config.bcrypt = {
    saltRounds: 10, // default 10
  };

  config.jwt = {
    secret: 'gm-gateway',
    enable: true, // default is false
    match: '/jwt', // optional
  };

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'gm_dev',
    timezone: '+08:00',
  };

  config.gmClientManager = {
    host: '127.0.0.1',
    port: 7002,
    concurrency: 1,
    username: '******',
    password: '******',
  };

  return config;
};
