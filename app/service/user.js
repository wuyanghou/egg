'use strict';
const Service = require('egg').Service;

class UserServices extends Service {

  async findList() {
    const user = await this.app.mysql.select('user');
    return user;
  }
}
module.exports = UserServices;
