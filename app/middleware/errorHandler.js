module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      console.log('error');
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit('error', err, ctx);
      const status = err.status || 500;
      const message = status === 500 ? 'Internal Server Error' : err.message;
      if (status === 422) {
      // 接口参数校验失败
        ctx.body = {
          code: -1,
          message: err.errors[0].field + ' ' + err.errors[0].message,
        };
      } else {
        // 错误响应对象
        ctx.body = {
          code: -1,
          message,
        };
      }
    }
  };
}
