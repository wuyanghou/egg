'use strict';
// const cheerio = require('cheerio');
const request = require('request');

module.exports = {
  schedule: {
    // interval: '1m', // 1 分钟间隔
    cron: '0 * 9,15 * * ?', // 9-15:59 每分钟执行一次 https://www.cnblogs.com/javahr/p/8318728.html
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {

    const options = { url: 'http://push2.eastmoney.com/api/qt/stock/get?invt=2&fltt=2&ut=a79f54e3d4c8d44e494efb8f748db291&secid=1.603318&fields=f43,f169,f170,f47,f48,f117,f168,f171,f162,f59,f78,f127,f198,f199,f262,f107&cb=jQuery18302851846236741802_1607868068634&_=1607868068843',
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
      const title = `派思股份${parseData.data.f43},涨跌价${parseData.data.f169},涨跌幅${parseData.data.f170}`;
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
