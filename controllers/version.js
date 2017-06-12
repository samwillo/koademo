/**
 * Created by liuzl on 2017/6/12.
 */
'use strict';

var fn_version = async (ctx, next) => {
    let version = {};
    version.version = '1.0.0';
    ctx.response.body = JSON.stringify(version);
};

module.exports = {
    'GET /version': fn_version,
    'GET /Version': fn_version,
    'GET /ver': fn_version,
    'GET /Ver': fn_version,
    'GET /v': fn_version,
    'GET /V': fn_version
}