'use strict';

const Controller = require('egg').Controller;

class WxController extends Controller {
  async index() {
    const { ctx } = this;
    const { echostr } = ctx.query;
    ctx.body = echostr;
  }
}

module.exports = WxController;
