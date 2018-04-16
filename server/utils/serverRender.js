/**
 * 服务器渲染的两个方法，一个渲染react组件成string，一个渲染handlebars
 */

import fs from 'fs';
import path from 'path';
import React from 'react';
import {renderToString} from 'react-dom/server';
import Handlebars from 'handlebars';

let devMidware = null;
let fsystem = fs;

const readFileThunk = function (hbsName) {
    let filename;
    if (devMidware) {
        filename = devMidware.getFilenameFromUrl(`/${hbsName}`);
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

export function setCompiler(midware) {
    devMidware = midware;
    fsystem = devMidware.fileSystem;
}

export function renderReactComp(Comp, props = {}) {
    return renderToString(<Comp {...props}/>)
}

let DEFAULT_STATE = {
    description: "服务器渲染",
    keywords: "react server side render,服务器渲染",
    title: "react server side render",
    content: "",
    initialState: "null",
}

export async function renderHbs(hbsName, data) {
    data = {...DEFAULT_STATE, ...data};
    var source = await readFileThunk(hbsName);
    var template = Handlebars.compile(source);
    var result = template(data);
    return result;
}