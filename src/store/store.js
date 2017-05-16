import {observable, action, computed} from 'mobx';
import moment from 'moment';
import {API_getCategorys} from '../utils/api';
class Store {
    // 查询条件
    @observable editArticleId = undefined;
    @observable category = [];

    @computed get editedUser() {

    }

    @action updateCategory = () => {
        return API_getCategorys().then(data => {
            this.category = [];
            for (var value of data) {
                if (!value.parentId)
                    this.category.push(value);
            }
        })
    }

}

const store = new Store();
export default store;
