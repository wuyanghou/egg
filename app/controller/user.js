'use strict';
const Controller = require('egg').Controller;

/**
 * @controller UserController。
 */
class UserController extends Controller {
  /**
   * @summary 根据ID查询信息。
   * @description 根据ID查询信息。
   * @router get /version01/controllers/selectById （ get 表示设置请求为 get 请求，最后的 selectById 对应下面的 selectById 方法 ）。
   * @request query integer Id 需要去查新的ID。（ get 对应 query 请求，请求值设定为 integer 纯数字类型，ID 为请求的字段，注意大小写，和下面的方法要一一对应，不然会报错 ）。
   * @response 200 JsonBody 返回结果。（ 对应 contract 里面的验证属性，下面会提到 。）
   */
  async index() {
    const { ctx } = this;
    ctx.body = 'hello user';
  }

  async login() {
    const { ctx, config } = this;
    const userToken = {
      name: ctx.request.query.name,
    }
    const token = ctx.app.jwt.sign(userToken, config.secret, { expiresIn: '1h' });
    ctx.body = {
      data: token,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.body = {
      success: true,
      message: '登出成功',
    };
  }

  async getCurrentInfo() {
    const { ctx } = this;
    ctx.logger.info('1234')
    ctx.body = { name: ctx.name };
  }
}

module.exports = UserController;
