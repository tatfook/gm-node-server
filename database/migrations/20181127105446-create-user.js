'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      BIGINT,
      STRING,
      DATE,
    } = Sequelize;

    await queryInterface.createTable('users', {
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
    });

    await queryInterface.addIndex('users', { fields: [ 'uid', 'username', 'loginTime', 'totalTime' ], name: 'indexOfUser' });
  },

  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
