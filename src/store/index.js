import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
      user,
      permission
    },
    getters
  })
  
  export default store
/*
export default new Vuex.Store({
    state: {
        // 属性
        token: '',
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
        menuList: JSON.parse(localStorage.getItem("menuList"))
    },
    mutations: {
        // set 方法
        SET_TOKEN: (state, token) => {
            state.token = token;
            localStorage.setItem("token",token);
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo;
            localStorage.setItem("userInfo",JSON.stringify(userInfo));
        },
        SET_MENULIST: (state, menuList) => {
            state.menuList = menuList;
            localStorage.setItem("menuList",JSON.stringify(menuList));
        },
        REMOVE_INFO: state => {
            state.token = '';
            state.userInfo = {};
            localStorage.setItem("token",'');
            localStorage.setItem("userInfo",JSON.stringify(''));
            localStorage.setItem("menuList",JSON.stringify(''));
        }

    },
    getters: {
        getToken: state => {
            return state.token;
        },
        getUserInfo: state => {
            return state.userInfo;
        },
        getMenuList: state => {
            return state.menuList;
        }
    },
    actions: {
    },
    modules: {
    }
})
*/