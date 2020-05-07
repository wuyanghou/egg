module.exports = (options, app) => {
  return async function authLogin(ctx, next){
    const { whiteList } = options;
    const url = ctx.url.split('?')[0];
    if (whiteList.includes(url) || url.includes('swagger') || url.includes('favicon')) {
      await next();
    } else {
      const token = ctx.header.authorization;
      if (token) {
        const payload = await ctx.app.jwt.verify(token, app.config.secret)  //解密，获取payload
        ctx.name = payload.name;
        await next();
      } else {
        ctx.body = {
          success: false,
          data: '未登录',
        };
      }
    }
  };
}
