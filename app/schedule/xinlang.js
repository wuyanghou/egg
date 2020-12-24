'use strict';
const cheerio = require('cheerio');

module.exports = {
  schedule: {
    // interval: '1m', // 1 分钟间隔
    cron: '0 * 10,14 * * ?', // 10-14:59 每分钟执行一次 https://www.cnblogs.com/javahr/p/8318728.html
    type: 'worker', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    try{
      const result = await ctx.curl('https://hq.sinajs.cn/rn=1608731604516&list=s_sh600121');
      const time = new Date();
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      const timeStr = `时间：${h}:${m}:${s}`;
      console.log(timeStr, 'timeStr');
      const list = result.data.toString().split('=');
      let d= list[1].replace(/\\n/g, '');
      d= d.replace(';', '').replace('"', '').replace('"', '');
      const data = d.split(',');
      const title = `郑州煤电${Number(data[1])},涨跌价${Number(data[2])},涨跌幅${Number(data[3])}`
      await ctx.curl('https://sc.ftqq.com/SCU117835Tf59f2299a43d58f3a208f85d8c1240b95f83f10332d72.send', {
        dataType: 'json',
        data: {
          text: `${title}`,
          desp: '股票提醒',
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
};
