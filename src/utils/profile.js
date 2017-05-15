const profile = {

    _profile: null,

    _code(data) {
        this._profile = {
            ...data,
            ...{
                id: data.user.id,
                profile: data.user.username || data.user.email || data.user.phone,
                expireTime: data.expireTime * 1000,
                loginTime: Date.now()
            }
        };
        const result = JSON.stringify(this._profile);
        return result;
    },

    login(data) {
        localStorage.profile = this._code(data);
    },

    loginBySession(data) {
        sessionStorage.profile = this._code(data);
        localStorage.removeItem('profile');
    },

    logout() {
        this._profile = null;
        localStorage.removeItem('profile');
        sessionStorage.removeItem('profile');
    },

    get() {
        if (this._profile)
            return this._profile;
        const profileStr = localStorage.profile || sessionStorage.profile;
        if (profileStr) {
            let prof;
            try {
                prof = JSON.parse(profileStr);
            } catch (err) {
                prof = JSON.parse(profileStr);
                if (!prof.user.email || !prof.user.qq || !prof.user.appName) {
                    return false;
                }
            }
            return prof;
        }
        return false;
    }
};

export default profile;
