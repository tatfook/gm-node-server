'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      BIGINT,
      INTEGER,
      STRING,
      DATE,
    } = Sequelize;

    return queryInterface.createTable('notices', {
      id: {
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      nid: {
        type: STRING(64),
      },

      adminId: {
        type: BIGINT,
      },

      serverIds: {
        type: STRING(1024),
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
    }, {
      underscored: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('notices');
  },
};
