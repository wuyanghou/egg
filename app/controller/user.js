'use strict';
const Controller = require('egg').Controller;

const loginRule = {
  name: { type: 'string', required: true },
  pwd: { type: 'number', required: true },
}


/**
 * @controller UserController。
 */
class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello user';
  }

  /**
   *  登录
   * @returns {Promise<void>}
   */
  async login() {
    const { ctx, config } = this;
    ctx.validate(loginRule, ctx.request.body);
    const userToken = {
      name: ctx.request.body.name,
    }
    const token = ctx.app.jwt.sign(userToken, config.secret, { expiresIn: '1h' });
    ctx.body = {
      data: token,
    };
  }

  /**
   *  登出
   * @returns {Promise<void>}
   */
  async logout() {
    const { ctx } = this;
    ctx.body = {
      success: true,
      message: '登出成功',
    };
  }

  /**
   *  获取当前登录用户信息
   * @returns {Promise<void>}
   */
  async getCurrentInfo() {
    const { ctx } = this;
    ctx.logger.info(`getCurrentInfo---${ctx.name}`);
    ctx.body = { name: ctx.name };
  }

  /**
   * 获取用户列表
   * @returns {Promise<void>}
   */
  async getUserList() {
    const { ctx } = this;
    const userInfo = await ctx.service.user.findList();
    ctx.body = {
      datas: userInfo,
      success: true,
    };
  }
}

module.exports = UserController;
