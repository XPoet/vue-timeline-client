import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 导入 MavonEditor
import MavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

// 导入 Axios
import Axios from "axios";

// Axios 全局拦截
import './axios'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.prototype.$axios = Axios;
Vue.use(MavonEditor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
