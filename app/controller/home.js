'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  /**
   * @Router POST /user
   * @Request body createUser name description-createUser
   * @Request header string access_token
   * @Response 200 baseResponse ok
   */
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
