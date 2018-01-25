/**
 * 服务器渲染的两个方法，一个渲染react组件成string，一个渲染handlebars
 */

import fs from 'fs';
var path = require('path');
import React from 'react';
import {renderToString} from 'react-dom/server';
import Handlebars from 'handlebars';

let compiler = null;
let fsystem = fs;

let DEFAULT_STATE = {
    description: "区块链大数据资讯平台",
    keywords: "CQcoin,比特币,BTC,区块链",
    title: "CQcoin-区块链大数据资讯平台",
    content: "",
    initialState: "null"
}

const readFileThunk = function (hbsName) {
    let filename;
    if (compiler) {
        filename = path.join(compiler.outputPath, hbsName)
    } else {
        filename = path.join(__dirname, `/client/${hbsName}`)
    }

    return new Promise((resolve, reject) => {
        fsystem.readFile(filename, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            resolve(data);
        });
    });
}

export function setCompiler(c) {
    compiler = c;
    fsystem = compiler.outputFileSystem;
}

export function renderReactComp(Comp, props = {}) {
    return renderToString(<Comp {...props}/>)
}

export async function renderHbs(hbsName, data) {
    data = {...DEFAULT_STATE, ...data};
    var source = await readFileThunk(hbsName);
    var template = Handlebars.compile(source);
    var result = template(data);
    return result;
}