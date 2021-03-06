'use strict';

const moment = require('moment');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');

exports.getToday = () => moment().format('YYYY-MM-DD');

exports.getDateBefore = (quantity, unit = 'days') =>
  moment().subtract(quantity, unit).format('YYYY-MM-DD');


// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    data: res,
    msg,
  };
  ctx.status = 200;
};
