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

let DEFAULT_STATE = {
    description: "币快讯-资讯",
    keywords: "币快讯-资讯",
    title: "币快讯-资讯",
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