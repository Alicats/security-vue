import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 属性
        token: '',
        // userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
        // menuList: JSON.parse(sessionStorage.getItem("menuList"))
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
            // sessionStorage.setItem("userInfo",JSON.stringify(userInfo));
            localStorage.setItem("userInfo",JSON.stringify(userInfo));
        },
        SET_MENULIST: (state, menuList) => {
            state.menuList = menuList;
            // sessionStorage.setItem("menuList",JSON.stringify(menuList));
            localStorage.setItem("menuList",JSON.stringify(menuList));
        },
        REMOVE_INFO: state => {
            state.token = '';
            state.userInfo = {};
            localStorage.setItem("token",'');
            // sessionStorage.setItem("userInfo",JSON.stringify(''));
            localStorage.setItem("userInfo",JSON.stringify(''));
            // sessionStorage.setItem("menuList",JSON.stringify(''));
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