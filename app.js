'use strict';

const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
    //const now = new Date().toLocaleString();
    console.log(`[INFO] ${Date().toLocaleString()} ${ctx.request.method}  ${ctx.request.url}`);
    await next();
});

app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`[INFO] ${Date().toLocaleString()} Time used : ${ms} ms`);
});

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, Koa world!</h1>' +
        '<h2>柳思远，我是爸爸</h2>' +
        '<h2>她是妈妈！</h2>' +
        '<h2>洗衣服的是爷爷</h2>' +
        '<h2>沙发上的是奶奶</h2>';
});

app.listen(3000);
console.log('app started at port 3000......');
