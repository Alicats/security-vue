import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import axios from 'axios';
import store from './store'

// import "./axios"

Vue.prototype.$axios = axios
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});


const whiteList = ['/login'] // 不重定向白名单

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    
    
    if(token){
        if(to.path === '/login'){
            next({path: '/'})
        }else{
            // 判断当前用户是否已拉取完userInfo信息
            if(store.getters.roles.length === 0){
                // 拉取用户信息
                store.dispatch('GetInfo').then(res=>{
                    const roles = res.data.roles
                   
                    store.dispatch('GenerateRoutes',{roles}).then(accessRoutes => {
                       
                        // 动态添加可访问路由表
                        router.addRoutes(accessRoutes)
                        // hack方法 确保addRoutes已完成
                        next({...to,replace: true})
                    })
                })
        
            }else{
               
                next()
            }
        }
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next({path: '/login'})
        }
    }
    
    

    /*
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        if (token) { // 判断当前的token是否存在 ； 登录存入的token
            if (to.path === '/login') {
            } else {
                next()
            }
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
    */
    

    // if(!userInfo && to.path !== '/login'){
    //     next('/login');
    // }else{
    //     next();
    // }


    /*
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
    */

});

new Vue({
    router,
    i18n,
    store,
    render: h => h(App)
}).$mount('#app');
