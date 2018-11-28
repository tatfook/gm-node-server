'use strict';

module.exports = app => {
  const {
    BIGINT,
  } = app.Sequelize;

  const model = app.model.define('user_emails', {
    id: {
      type: BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: BIGINT,
      allowNull: false,
    },

    emailId: {
      type: BIGINT,
      allowNull: false,
    },

  }, {
    underscored: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
  });

  return model;
};
