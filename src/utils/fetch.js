import fetch from 'isomorphic-fetch';
import Profile from './profile.js';
import config from '../config.js';


export function fetchGet(url, data = {}) {
    const profile = Profile.get();
    const requestUrl = encodeURI(`${config.backend.url}${url}?${serialize(data)}`);
    console.log('%c' + requestUrl, 'color: green');
    const res = fetch(requestUrl, {
        headers: {
            'X-Auth-Token': profile && profile.token,
        },
    });

    return compose(
        formatJson,
        catchError,
    )(res);
}

export function fetchPost(url, data = {}, options = {type: 'form', method: 'POST'}) {
    const profile = Profile.get();
    console.log('%c' + url, 'color: green');

    let formData = new FormData();

    if (data instanceof FormData) {
        formData = data;
    }else{
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
    }

    formData.append("iddddd","source");


    const requestUrl = config.backend.url + url;

    const headers = {};
    if (options.type === 'json') {
        headers.Accept = 'application/json';
        headers['Content-Type'] = 'application/json';
    }

    if (profile) {
        headers['X-Auth-Token'] = profile.token;
    }
    const res = fetch(requestUrl, {
        method: options.method,
        headers,
        body: options.type === 'form' ? formData : typeof data === 'object' ? JSON.stringify(data) : data,
    });

    return compose(
        formatJson,
        catchError,
    )(res);
}

export function fetchDelete(url, word) {
    const profile = Profile.get();

    console.log('%c' + url, 'color: green');

    const requestUrl = window.encodeURI(config.backend.url + url);

    const res = fetch(requestUrl, {
        method: 'DELETE',
        headers: {
            'X-Auth-Token': profile && profile.token,
        },
        body: word,
    });

    return compose(
        formatJson,
        catchError,
    )(res);
}

function compose(...funcs) {
    return arg => funcs.reduce((composed, f) => f(composed), arg);
}

function formatJson(promise) {
    return promise.then(res => {
        if (res.status === 401) window.location.href = '/login';   //Unauthorized
        if (!res.ok) {
            const err = new Error(res.statusText);
            err.res = res;
            throw err;
        }

        return res.json();
    });
}

function catchError(promise) {
    return promise.catch(err => {
        console.log(err.stack);
    });
}


function serialize(data) {
    return Object
        .keys(data)
        .reduce((arr, key) => {
            if (data[key] || data[key] === 0) arr.push(`${key}=${data[key]}`);
            return arr;
        }, [])
        .join('&');
}
