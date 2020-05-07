module.exports = {
  schedule: {
    interval: '1m', // 1 分钟间隔
    cron: '0 0 0 * * ?', // https://www.cnblogs.com/javahr/p/8318728.html
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    // const res = await ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    // ctx.app.cache = res.data;
    console.log(123);
  },
};
