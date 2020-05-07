'use strict';

module.exports = {
  login: {
    name: { type: 'string', required: true, description: '登录账号', example: 'admin' },
    pwd: { type: 'number', required: true, description: '登录密码', example: 123 },
  },
  response: {
    success: { type: 'boolean', example: true },
    code: { type: 'number', example: 1 },
  },
};
