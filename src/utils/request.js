import axios from 'axios';
import ElementUI from 'element-ui';
import store from '../store'

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    baseURL:  "http://localhost:7777",
    timeout: 5000
});

// axios 前置拦截
service.interceptors.request.use(config => {
        const token = store.getters.token

        if(token){
            config.headers['Authorization'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        return config;
    },error => {
        console.log(error);
        return Promise.reject();
    }
);


// axios 后置拦截
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
