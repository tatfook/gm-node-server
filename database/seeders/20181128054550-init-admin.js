'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('admins', [{
      username: 'admin',
      role: 'admin',
      encryptPassword: bcrypt.hashSync('123123', 10),
      createdAt: '2018-11-30 10:00:00',
      updatedAt: '2018-11-30 10:00:00',
    }], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('admins', null, {});
  },
};
