import {
    fetchPost,
    fetchGet,
    fetchDelete,
    fetchPut
} from './fetch.js';

export function API_login(data) {
    return fetchPost('account/login', data);
}


// -------------- 文章操作
export function API_getArticle(id) {
    if (id !== undefined) {
        return fetchGet(`column/articles/${id}`);
    } else {
        return fetchGet("column/articles")
    }
}

export function API_addArticle(data) {
    return fetchPost("column/articles", data, {type: "json"});
}

export function API_deleteArticle(id) {
    return fetchDelete(`column/articles/${id}`);
}

export function API_updateArticle(data) {
    return fetchPost(`column/articles/${data.id}`, data, {type: "json"});
}

export function API_getCategorys() {
    return fetchGet("column/categorys");
}

export function API_addCategory(type) {
    return fetchPost("column/categorys", {type}, {type: "json"});
}

export function API_deleteCategory(id) {
    return fetchDelete(`column/categorys/${id}`);
}

// ----------------------------------- 图片操作
export function API_uploadImage(data) {
    return fetchPost("image/uploadImage", data)
}

export function API_getImages(data) {
    return fetchGet("image/getImages")
}

export function API_deleteImages(id) {
    return fetchDelete(`image/deleteImages`, [id], {type: "json"});
}
