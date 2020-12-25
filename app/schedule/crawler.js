'use strict';
// const cheerio = require('cheerio');
const request = require('request');

module.exports = {
  schedule: {
    // interval: '1m', // 1 分钟间隔
    // cron: '0 * 9,15 * * ?', // 9-15:59 每分钟执行一次 https://www.cnblogs.com/javahr/p/8318728.html
    cron: '0 * 9,15 * * MON-FRI', //周一至周五 9-15:59 每分钟执行一次 https://www.cnblogs.com/javahr/p/8318728.html
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {

    const options = { url: 'https://push2.eastmoney.com/api/qt/stock/get?fltt=2&ut=a79f54e3d4c8d44e494efb8f748db291&invt=2&secid=1.600121&fields=f43,f48,f170,f57,f107,f58,f169,f107,f78&cb=qa_wap_jsonpCB1608774618307',
      method: 'GET',
      encoding: null,
      header: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        Referer: 'https://www.baidu.com',
      },
    }
    request(options, async (err, res, body) => {
      if (err) throw err;
      const parseData = JSON.parse(body.toString().match(/\((.+?)\)/g)[0].replace('(', '').replace(')', ''));
      const title = `${parseData.data.f58}${parseData.data.f43},涨跌价${parseData.data.f169},涨跌幅${parseData.data.f170}`;
      const time = new Date();
      const h = time.getHours();
      const m = time.getMinutes();
      const s = time.getSeconds();
      const timeStr = `时间：${h}:${m}:${s}`;

      // const htmlData = result.data.toString();
      // const $ = cheerio.load(htmlData, {
      //   // 处理汉字乱码情况
      //   decodeEntities: false,
      // });
      // const price = $('#price9').html();

      await ctx.curl('https://sc.ftqq.com/SCU117835Tf59f2299a43d58f3a208f85d8c1240b95f83f10332d72.send', {
        dataType: 'json',
        data: {
          text: `${title}, ${timeStr}`,
          desp: '股票提醒',
        },
      });
    });
  },
};
