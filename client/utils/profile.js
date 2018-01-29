// 保存用户的基本信息

let userInfo = null;

function get() {
    return userInfo;
}

function login(data) {
    userInfo = data;
}

function logout() {
    userInfo = null;
}

export default {
    get, login, logout
}