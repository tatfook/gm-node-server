'use strict';

module.exports = app => {
  const {
    BIGINT,
    DATE,
    DATEONLY,
    NOW,
    INTEGER,
  } = app.Sequelize;

  const Online = app.model.define('online', {
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

  Online.hook('beforeCreate', online => {
    online.date = NOW();
    const [ year, month, day ] = online.date.split('-');
    online.year = Number(year);
    online.month = Number(month);
    online.day = Number(day);
  });

  return Online;
};
