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

    adminId: {
      type: BIGINT,
    },

    // title: {
    //   type: STRING(1024),
    //   allowNull: false,
    // },

    content: {
      type: STRING(1024),
      allowNull: false,
    },

    status: {
      type: INTEGER,
      defaultValue: 0,
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

  Notice.associate = () => {
    app.model.Notice.belongsTo(app.model.Admin);
  };

  Notice.hook('afterUpdate', async notice => {
    if (notice.status === 1) {
      const detail = JSON.stringify({
        content: notice.content,
      });
      await app.model.Log.create({
        resourceId: notice.id,
        type: 'notice',
        operatorId: notice.adminId,
        detail,
        createdAt: notice.updatedAt,
      });
    }
  });

  return Notice;
};
