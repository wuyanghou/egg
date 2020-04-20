module.exports = (options, app) => {
  return async function authLogin(ctx, next){
    console.log(ctx.url, 'ctx.url');
    const { whiteList } = options;
    if (whiteList.includes(ctx.url)) {
      next();
    } else {
      //  检查是否登录
      // ctx.body = {
      //   success: false,
      // }
      next();
    }
  }
}
