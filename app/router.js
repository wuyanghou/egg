'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  console.log(app.config.env, 'app.config.env');
  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);
};
