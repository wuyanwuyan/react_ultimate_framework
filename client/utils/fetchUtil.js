export function fetchGet(url, query = {}, option = {}) {
    let isOk;
    let serializeQuery = serialize(query);
    let finalUrl = `${url}` + (serializeQuery ? `?${serializeQuery}` : '');

    __DEV__ && console.log('%c start fetchGet:  ' + finalUrl, 'color: green');

    let headers = {
        // 'Content-Type': 'application/json;charset=utf-8'
    };


    return new Promise((resolve, reject) => {
        fetch(finalUrl, {
            headers,
        })
            .then((response) => {
                // token过期 ，没权限
                if (response.status === 401) {

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

    let headers = {};


    if (type === 'json') {
        // headers.Accept = 'application/json';
        headers['Content-Type'] = 'application/json';
    }

    let finalUrl = `${url}`;

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
}

export function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== null) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}