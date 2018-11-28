'use strict';

module.exports = app => {
  const {
    BIGINT,
    STRING,
    INTEGER,
    DATE,
    VIRTUAL,
  } = app.Sequelize;

  const Email = app.model.define('emails', {
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

    userIds: {
      type: VIRTUAL,
      default: [],
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

  Email.associate = () => {
    app.model.Email.belongsToMany(app.model.User, {
      as: 'users',
      through: app.model.UserEmail,
    });
  };

  Email.hook('afterCreate', obj => {
    if (obj.userIds) {
      obj.setUsers(obj.userIds);
    }
  });

  Email.hook('afterUpdate', obj => {
    if (obj.userIds) {
      obj.setUsers(obj.userIds);
    }
  });

  return Email;
};
