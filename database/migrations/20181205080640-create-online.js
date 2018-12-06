'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      BIGINT,
      DATE,
      DATEONLY,
      INTEGER,
    } = Sequelize;
    return queryInterface.createTable('onlines', {
      id: {
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      max: {
        type: BIGINT,
        allowNull: false,
        defaultValue: 0,
      },

      date: {
        type: DATEONLY,
        unique: true,
      },

      createdAt: {
        type: DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DATE,
        allowNull: false,
      },
      year: {
        type: INTEGER,
      },
      month: {
        type: INTEGER,
      },
      day: {
        type: INTEGER,
      },
    }, {
      underscored: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_bin',
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('Onlines');
  },
};
