'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  console.log(app.config.env, 'app.config.env');
  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);
  router.post('/login', controller.user.login);
  router.post('/logout', controller.user.logout);
  router.get('/getCurrentInfo', controller.user.getCurrentInfo);
  router.get('/getUserList', controller.user.getUserList);
};
