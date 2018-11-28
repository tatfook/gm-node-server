'use strict';

module.exports = app => {
  const {
    BIGINT,
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Notice = app.model.define('notices', {
    id: {
      type: BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: STRING(1024),
      allowNull: false,
    },

    content: {
      type: STRING(1024),
      allowNull: false,
    },

    status: {
      type: INTEGER,
      default: 0,
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
  });

  return Notice;
};
