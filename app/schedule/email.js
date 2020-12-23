'use strict';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'qq',
  secureConnection: true,
  port: 465,
  auth: {
    user: '178647142@qq.com', // 账号
    pass: 'dnlnxedoahxcbhfi', // SMTP授权码
  },
});


module.exports = {
  schedule: {
    // interval: '1m', // 1 分钟间隔
    cron: '0 0 9 * * ?', // 每天9点触发 https://www.cnblogs.com/javahr/p/8318728.html
    type: 'worker', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    console.log('emailemail');
    const mailOptions = {
      from: '178647142@qq.com', // 发送者,与上面的user一致
      to: '1661391985@qq.com', // 接收者,可以同时发送多个,以逗号隔开
      subject: '今天又是元气满满的一天哦', // 标题
      html: '<h2>加油，打工人！</h2>',
    };
    transporter.sendMail(mailOptions).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  },
};
