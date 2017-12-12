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
    description: "***后台系统",
    keywords: "***后台管理系统，管理",
    title: "***管理系统",
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
            if (err) return reject(err);
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