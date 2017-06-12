/**
 * Created by liuzl on 2017/6/12.
 */
'use strict';

var fn_hello = async (ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name} !</h1>`;
};

module.exports = {
    'GET /hello/:name': fn_hello
};