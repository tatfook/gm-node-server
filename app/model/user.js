'use strict';

module.exports = app => {
  const {
    BIGINT,
    STRING,
    DATE,
  } = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    uid: {
      type: STRING(64),
    },

    username: {
      type: STRING(64),
      unique: true,
      allowNull: false,
    },

    loginTime: {
      type: DATE,
    },

    totalTime: {
      type: STRING(64),
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

  return User;
};
