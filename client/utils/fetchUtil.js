import config from '../constant/config';
import FormData from 'form-data';

export function fetchGet(url, query = {}, option = {}) {
    let isOk;
    let serializeQuery = serialize(query);
    let queryStr = serializeQuery ? `?${serializeQuery}` : '';
    let finalUrl = `${config.backend.url}${url}`;

    if (/^http/.test(url)) {
        finalUrl = url;
    }

    finalUrl += queryStr;

    let headers = {
        // 'Content-Type': 'application/json;charset=utf-8'
    };

    __DEV__ && console.log('%c start fetchGet:  ' + finalUrl, 'color: green');
    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            headers,
        })
            .then((response) => {
                // token过期 ，没权限
                // if (response.status === 401) {
                //
                // }

                isOk = !!response.ok;
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                else {
                    return response.text()
                }
            })
            .then((responseData) => {

                __DEV__ && console.log('%c end fetchGet:  ' + finalUrl, 'color: green');

                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                __DEV__ && console.error(error);
                reject(error);
            });
    });
}


export function fetchPost(url, data = {}, type = 'json') {
    let isOk;

    let headers = {};

    const formData = new FormData();
    for (const key in data) {
        formData.append(key, data[key]);
    }

    if (type === 'json') {
        // headers.Accept = 'application/json';
        headers['Content-Type'] = 'application/json';
    }

    let finalUrl = `${config.backend.url}${url}`;

    if (/^http/.test(url)) {
        finalUrl = url;
    }

    __DEV__ && console.log('%c start fetchPost:  ' + finalUrl, ' data: ', data, 'color: green');
    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            method: 'POST',
            headers,
            body: type === 'form' ? formData : typeof data === 'object' ? JSON.stringify(data) : data,
        })
            .then((response) => {
                // token过期 ，没权限
                // if (response.status === 401) {
                //
                // }

                isOk = !!response.ok;
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json();
                }
                else {
                    return response.text()
                }
            })
            .then((responseData) => {

                __DEV__ && console.log('%c end fetchPost:  ' + finalUrl, ' data: ', data, 'color: green');

                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                __DEV__ && console.error(error);
                reject(error);
            });
    });
}

export function fetchPut(url) {

}

export function fetchDelete(url, query = {}, option = {}) {
}

export function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== null) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}