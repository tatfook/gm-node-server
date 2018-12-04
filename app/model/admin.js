'use strict';

const bcrypt = require('bcryptjs');

module.exports = app => {
  const {
    BIGINT,
    STRING,
    DATE,
    VIRTUAL,
  } = app.Sequelize;

  const Admin = app.model.define('admins', {
    id: {
      type: BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: STRING(64),
      unique: true,
      allowNull: false,
    },

    password: {
      type: VIRTUAL,
    },

    encryptPassword: {
      type: STRING(64),
      allowNull: false,
    },

    role: {
      type: STRING(64),
      allowNull: false,
    },

    createdAt: {
      type: DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DATE,
      allowNull: false,
    },
  }, {
    underscored: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
  });

  Admin.hook('beforeValidate', admin => {
    if (admin.password) {
      admin.encryptPassword = bcrypt.hashSync(admin.password);
    }
  });

  Admin.entity = async obj => {
    obj.encryptPassword = undefined;
    return obj;
  };

  return Admin;
};
