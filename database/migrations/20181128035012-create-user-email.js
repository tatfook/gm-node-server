'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      BIGINT,
    } = Sequelize;
    return queryInterface.createTable('user_emails', {
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

      createdAt: {
        type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
        allowNull: false,
      },

      updatedAt: {
        type: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
        allowNull: false,
      },

    }, {
      underscored: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('user_emails');
  },
};
