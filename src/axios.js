import Axios from "axios";
import ElementUI from 'element-ui';
import router from './router'
import store from './store'

// 接口 URL 前缀
Axios.defaults.baseURL = 'http://localhost:8080';

// 前置拦截
Axios.interceptors.request.use(config => {
  return config;
});

// 后置拦截
Axios.interceptors.response.use(response => {

    if (response.data.code === 200) {
      return response;
    } else {
      ElementUI.Message.error(response.data.msg);
      return Promise.reject(response.data.msg);
    }

  }, error => {

    if (error.response && error.response['status'] === 401) {
      store.commit('REMOVE_INFO');
      router.push('/login');
    }

    if (error.response && error.response.data) {
      error.message = error.response.data.msg;
    }

    ElementUI.Message.error(error.message);

    return Promise.reject(error);
  }
);
