'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('admins', [{
      username: 'admin',
      role: 'admin',
      encryptPassword: bcrypt.hashSync('admin', 10),
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    }], {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('admins', null, {});
  },
};
