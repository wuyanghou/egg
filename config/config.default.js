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
    middleware: [ 'authLogin', 'errorHandler' ],
    authLogin: {
      whiteList: [ '/login', '/logout', '/' ],
    },
    jwt: {
      secret: '123456',
    },
    mysql: {
      client: {
        // host
        host: '127.0.0.1',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'TYlm920606',
        // 数据库名
        database: 'egg',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  };
  config.cluster = {
    listen: {
      path: '',
      port: 8003,
    },
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg',
    username: 'root',
    password: 'TYlm920606',
  };
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg测试接口',
      description: '测试接口文档',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    securityDefinitions: {
      apikey: {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
      },
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true,
  };
  exports.security = {
    csrf: false, // 开启的话直接post请求会报错
  };
  return {
    ...config,
    ...userConfig,
  };
};
