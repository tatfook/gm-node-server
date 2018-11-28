'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      BIGINT,
      STRING,
      INTEGER,
      DATE,
    } = Sequelize;

    return queryInterface.createTable('emails', {
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
  },

  down: queryInterface => {
    return queryInterface.dropTable('emails');
  },
};
