import server from "../config/server";
import Profile from "./profile";


export function fetchGet(url, query = {}, option = {}) {
    let isOk;
    let profile = Profile.get();
    let serializeQuery = serialize(query);
    let finalUrl = `${server.backend}${url}` + (serializeQuery ? `?${serializeQuery}` : '');

    if (option.url) {
        finalUrl = option.url;
    }

    __DEV__ && console.log('%c start fetchGet:  ' + finalUrl, 'color: green');

    let headers = {
        // 'Content-Type': 'application/json;charset=utf-8'
    };

    if (profile) {
        headers['X_Auth_Token'] = profile.token;
    }

    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            headers,
        })
            .then((response) => {
                // token过期 ，没权限
                if (response.status === 401) {
                    Profile.logout();
                }

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
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}


export function fetchPost(url, data = {}, type = 'json') {
    let isOk;
    let profile = Profile.get();

    let headers = {};

    if (profile) {
        headers['X_Auth_Token'] = profile.token;
    }

    if (type === 'json') {
        // headers.Accept = 'application/json';
        headers['Content-Type'] = 'application/json';
    }

    let finalUrl = `${server.backend}${url}`;

    __DEV__ && console.log('%c start fetchPost:  ' + finalUrl, ' data: ', data, 'color: green');
    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        })
            .then((response) => {
                // token过期 ，没权限
                if (response.status === 401) {
                    Profile.logout();
                }

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
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function fetchPut(url) {

}

export function fetchDelete(url,query = {}, option = {}) {
    let isOk;
    let profile = Profile.get();
    let serializeQuery = serialize(query);
    let finalUrl = `${server.backend}${url}` + (serializeQuery ? `?${serializeQuery}` : '');

    let headers = {
        // 'Content-Type': 'application/json;charset=utf-8'
    };

    if (profile) {
        headers['X_Auth_Token'] = profile.token;
    }

    __DEV__ && console.log('%c start fetchDelete:  ' + finalUrl, 'color: green');
    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            method: 'DELETE',
            headers,
        })
            .then((response) => {

                __DEV__ && console.log('fetchGet response  ' + finalUrl, response);

                // token过期 ，没权限
                if (response.status === 401) {
                    Profile.logout();
                }

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
                if (isOk) {
                    resolve(responseData);
                } else {
                    reject(responseData);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
}

export function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== null) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}