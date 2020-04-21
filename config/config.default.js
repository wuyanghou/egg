/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587084348186_5935';

  // add your middleware config here
  config.middleware = [];


  // add your user config here
  const userConfig = {
    middleware: [ 'authLogin' ],
    authLogin: {
      whiteList: [ '/login', '/logout', '' ],
    },
    jwt: {
      secret: '123456',
    },
    // mysql: {
    //   client: {
    //     // host
    //     host: 'mysql.com',
    //     // 端口号
    //     port: '3306',
    //     // 用户名
    //     user: 'test_user',
    //     // 密码
    //     password: 'test_password',
    //     // 数据库名
    //     database: 'test',
    //   },
    //   // 是否加载到 app 上，默认开启
    //   app: true,
    //   // 是否加载到 agent 上，默认关闭
    //   agent: false,
    // },
  };

  config.cluster = {
    listen: {
      path: '',
      port: 8003,
    },
  };


  return {
    ...config,
    ...userConfig,
  };
};
