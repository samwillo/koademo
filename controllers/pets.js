/**
 * Created by liuzl on 2017/6/15.
 */

'use strict';

const Sequelize = require('sequelize');
const mysql = require('mysql');
const config = require('../config');

console.log(`[INFO] ${Date().toLocaleString()} init sequelize ...`);

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

//console.log(sequelize);

var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: Sequelize.BIGINT,
    updatedAt: Sequelize.BIGINT,
    version: Sequelize.BIGINT
}, {
        timestamps: false
});

console.log(`[INFO] ${typeof(Pet)}`);

var now = Date.now();

var fn_addpet = async (ctx, next) => {
    console.log('[INFO] start to create...');
    let petname = ctx.params.name;
    let mypet = await Pet.create({
        id: 'g-' + now,
        name: petname,
        gender: false,
        birth: '2017-06-01',
        createdAt: now,
        updatedAt: now,
        version: 0
    });
    ctx.response.body = `<h1>Created Pet: + ${JSON.stringify(mypet)}</h1>`;
};

var fn_list = async (ctx, next) => {
    let pets = await Pet.findAll();
    console.log(`[INFO] list, find ${pets.length} pets:`);
    let result = '';
    for (let p of pets) {
        console.log(JSON.stringify(p));
        result = result + `<h2>Name: ${p.name}, Birth: ${p.birth}</h2>`;
    }
    ctx.response.body = result;
};

var fn_querybyname = async (ctx, next) => {
    let petname = ctx.params.name;
    let pets = await Pet.findAll({
        where: {
            name: petname
        }
    });
    let result = '';
    console.log(`[INFO] query, find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
        result = result + `<h2>Name: ${p.name}, Birth: ${p.birth}</h2>`;
    }
    ctx.response.body = result;
};

module.exports = {
    'POST /pets/add/:name': fn_addpet,
    'GET /pets': fn_list,
    'GET /pets/:name': fn_querybyname
};