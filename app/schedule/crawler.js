module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    // cron: '0 0 0 * * ?', // https://www.cnblogs.com/javahr/p/8318728.html
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    await ctx.curl('https://sc.ftqq.com/SCU43006T603ab42f430eaf2805817586a0648cb65c4916bce3883.send', {
      dataType: 'json',
      data: {
        text: `你好${Math.random()}`,
        desp: '今天周一',
      },
    });
    // ctx.app.cache = res.data;
    console.log(123);
  },
};
