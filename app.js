'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');

const app = new Koa();
const port = 3000;

app.use(async (ctx, next) => {
    console.log(`[INFO] ${Date().toLocaleString()} ${ctx.request.method}  ${ctx.request.url} ...`);
    await next();
    console.log(`[INFO] ${Date().toLocaleString()} End`);
});

app.use(bodyParser());

app.use(controller());

app.listen(port);
console.log(`app started at port ${port}......`);
