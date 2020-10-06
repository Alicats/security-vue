import axios from 'axios'
import router from './router'
import store from './store'
import Element from 'element-ui'

axios.defaults.baseURL = "http://localhost:7777";

// 前置拦截
axios.interceptors.request.use(config => {
    return config
});

// 后置拦截
axios.interceptors.response.use(response => {
        let res = response.data;

        return response;
        /*
        if(res.code === 200){
            return response
        }else {
            Element.Message.error('错了哦，这是一条错误消息', {duration: 3 * 1000});
            return response;
            // return Promise.reject(res.message)
        }
        */
    },
    error => {
        console.log(error);
        if(error.response.data){
            error.message = error.response.data.message;
        }

        if(error.response.status === 401){
            store.commit("REMOVE_INFO");
            router.push("/login");
        }

        Element.Message.error(error.message, {duration: 3 * 1000});
        return Promise.reject(error)
    }
);



