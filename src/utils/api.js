import {
    fetchPost,
    fetchGet,
    fetchDelete,
} from './fetch.js';

export function API_login(data) {
    return fetchPost('account/login', data);
}


// -------------- 文章操作
export function API_getArticle(id) {
    if (id !== undefined) {
        return fetchGet(`column/getArticle`,{articleId:id});
    } else {
        return fetchGet("column/articles")
    }
}

export function API_addArticle(data) {
    return fetchPost("column/addArticle",data);
}

export function API_deleteArticle(id) {
    return fetchDelete(`column/deleteArticle?articleId=${id}`);
}

export function API_getCategorys() {
    return fetchGet("getCategorys");
}

export function APIuploadImage() {

}


// ----------------------------------- 图片操作
export function API_uploadImage(data) {
    return fetchPost("column/uploadImage", data)
}

export function API_ugetImages(data) {
    return fetchGet("column/getImages")
}
