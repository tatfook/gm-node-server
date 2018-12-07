'use strict';

module.exports = app => {
  const {
    BIGINT,
    STRING,
    DATE,
    TEXT,
  } = app.Sequelize;

  const Log = app.model.define('log', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: BIGINT,
    },

    resourceId: BIGINT,

    type: STRING(64),

    operatorId: BIGINT,

    detail: TEXT,

    createdAt: {
      allowNull: false,
      type: DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DATE,
    },
  }, {
    underscored: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
  });

  return Log;
};
