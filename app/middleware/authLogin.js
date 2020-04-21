module.exports = (options, app) => {
  return async function authLogin(ctx, next){
    const { whiteList } = options;
    console.log(ctx.url, 'ctx.url');
    if (whiteList.includes(ctx.url.split('?')[0])) {
      next();
    } else {
      const token = ctx.header.authorization;
      if (token) {
        const payload = await ctx.app.jwt.verify(token, app.config.secret)  //解密，获取payload
        ctx.name = payload.name;
        next();
      } else {
        ctx.body = {
          success: false,
          data: '未登录',
        };
      }
    }
  };
}
