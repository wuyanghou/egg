'use strict';
const Controller = require('egg').Controller;
const loginRule = {
  name: { type: 'string', required: true },
  pwd: { type: 'number', required: true },
}

/**
 * @controller 用户模块。
 */
class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello user';
  }

  /**
   * @summary login
   * @description 用户登录
   * @router POST /login
   * @consumes application/json
   * @request body login *login
   * @response 200 response
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
   * @summary logout
   * @description 用户登出
   * @router POST /logout
   * @response 200 response
   */
  async logout() {
    const { ctx } = this;
    ctx.body = {
      success: true,
      message: '登出成功',
    };
  }

  /**
   * @summary getCurrentInfo
   * @description 获取当前登录用户信息
   * @router GET /getCurrentInfo
   * @response 200 response
   */
  async getCurrentInfo() {
    const { ctx } = this;
    console.log(8888);
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
