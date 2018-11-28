'use strict';

// had enabled by egg
// exports.static = true;
exports.parameters = {
  enable: true,
  package: 'egg-parameters',
};

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

exports.bcrypt = {
  enable: true,
  package: 'egg-bcrypt',
};
