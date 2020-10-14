'use strict';
const cheerio = require('cheerio');

module.exports = {
  schedule: {
    // interval: '1m', // 1 分钟间隔
    cron: '0 * 9,15 * * ?', // 9-15:59 每分钟执行一次 https://www.cnblogs.com/javahr/p/8318728.html
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // const result = await ctx.curl('http://guba.eastmoney.com/list,002006.html?from=BaiduAladdin');
    const result = await ctx.curl('http://push2.eastmoney.com/api/qt/stock/get?invt=2&fltt=2&ut=a79f54e3d4c8d44e494efb8f748db291&secid=0.002132&fields=f43,f169,f170,f47,f48,f117,f168,f171,f162,f59,f78,f127,f198,f199,f262,f107&cb=jQuery18309608347219631237_1602693509498&_=1602693509782');
    const data = result.data.toString().match(/\((.+?)\)/g)[0].replace('(', '').replace(')', '');
    const parseData = JSON.parse(data);
    const title = `恒星科技${parseData.data.f43},涨跌价${parseData.data.f169},涨跌幅${parseData.data.f170}`;
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
  },
};
