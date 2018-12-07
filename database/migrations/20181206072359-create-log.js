'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      BIGINT,
      STRING,
      DATE,
      TEXT,
    } = Sequelize;

    return queryInterface.createTable('logs', {
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
  },
  down: queryInterface => {
    return queryInterface.dropTable('logs');
  },
};
