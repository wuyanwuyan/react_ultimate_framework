import {
    fetchPost,
    fetchGet,
    fetchDelete,
} from './fetch.js';

export function API_login(data) {
    return new Promise(function (r) {

    })
}

export function uploadFile(data) {
    return fetchPost("upload", data)
}