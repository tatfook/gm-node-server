'use strict';

module.exports = app => {
  const {
    BIGINT,
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;

  const Email = app.model.define('emails', {
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
      defaultValue: 0,
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
      defaultValue: 0,
    },

    attachments: {
      type: STRING(64),
    },

    status: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    validTime: {
      type: INTEGER,
    },

    showPriority: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    isDestroy: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    isPopping: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
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

  Email.associate = () => {
    app.model.Email.belongsTo(app.model.Admin);
  };

  Email.prototype.parseOnlineIds = obj => {
    if (obj.addresseeType === 1) {
      return obj.receivers.split(',');
    } else if (obj.addresseeType === 2) {
      return [ obj.receivers.split(':')[0] ];
    }
  };

  Email.prototype.parseUids = obj => {
    if (obj.addresseeType === 2) return obj.receivers.split(':')[1].split(',');
  };

  Email.prototype.getDelayTime = obj => {
    return obj.delayAt ? obj.delayAt - obj.createdAt : 0;
  };

  Email.prototype.getAttachments = obj => {
    if (obj.mailType === 1) {
      return obj.attachments.split(',').map(att => {
        const attrs = att.split(':');
        return { id: attrs[0], count: attrs[1] };
      });
    }
  };

  Email.hook('afterUpdate', async email => {
    if (email.status === 1) {
      const detail = JSON.stringify({
        sender: email.sender,
        receivers: email.receivers,
        title: email.title,
        content: email.content,
      });

      await app.model.Log.create({
        resourceId: email.id,
        type: 'email',
        operatorId: email.adminId,
        detail,
        createdAt: email.updatedAt,
      });
    }
  });

  return Email;
};
