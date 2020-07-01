import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('timeline_token'),
    userInfo: JSON.parse(sessionStorage.getItem('timeline_userInfo'))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token;
      localStorage.setItem('timeline_token', token);
    },

    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
      sessionStorage.setItem('timeline_userInfo', JSON.stringify(userInfo));
    },

    REMOVE_INFO: (state) => {
      state.token = '';
      state.userInfo = {};
      localStorage.setItem('timeline_token', '');
      sessionStorage.setItem('timeline_userInfo', '');
    },


  },
  getters: {
    // get
    getUser: state => {
      return state.userInfo;
    }
  },
  actions: {},
  modules: {}
})
