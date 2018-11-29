'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      BIGINT,
      STRING,
      INTEGER,
      DATE,
    } = Sequelize;

    await queryInterface.createTable('emails', {
      id: {
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      mid: {
        type: BIGINT,
      },

      adminId: {
        type: BIGINT,
      },

      addresseeType: {
        type: INTEGER,
        default: 0,
      },

      receivers: {
        type: STRING(1024),
      },

      sender: {
        type: STRING(64),
        allowNull: false,
      },

      title: {
        type: STRING(1024),
        allowNull: false,
      },

      content: {
        type: STRING(1024),
        allowNull: false,
      },

      mailType: {
        type: INTEGER,
        allowNull: false,
        default: 0,
      },

      attachments: {
        type: STRING(64),
      },

      status: {
        type: INTEGER,
        allowNull: false,
        default: 0,
      },

      validTime: {
        type: INTEGER,
      },

      showPriority: {
        type: INTEGER,
        allowNull: false,
        default: 0,
      },

      isDestroy: {
        type: INTEGER,
        allowNull: false,
        default: 0,
      },

      isPopping: {
        type: INTEGER,
        allowNull: false,
        default: 0,
      },

      delayAt: {
        type: DATE,
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
    return queryInterface.dropTable('emails');
  },
};
