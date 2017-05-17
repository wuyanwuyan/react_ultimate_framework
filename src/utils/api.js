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

export function API_AllgetArticle(state = -1, page = 1, limit = 10) {
    var query = {state,offset: (page - 1) * limit, limit};
    return fetchGet("column/articles", query);
}

export function API_getArticleByArticleId(id) {
    return fetchGet(`column/articles/${id}`);

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
    return fetchPost("column/image/uploadImage", data)
}

export function API_getImages(offset = 0,limit = 50) {
    var query = {offset,limit};
    return fetchGet("column/image/getImages",query);
}

export function API_deleteImages(id) {
    return fetchDelete(`column/image/deleteImages`, [id], {type: "json"});
}
