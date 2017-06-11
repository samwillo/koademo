'use strict';

const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, Koa world!</h1>' + '<h2>柳思远，我是爸爸</h2>';
});

app.listen(3000);
console.log('app started at port 3000......');
