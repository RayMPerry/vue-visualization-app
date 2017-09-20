import Vue from 'vue';
import Vuex from 'vuex';
import store from './store/appStore';
import router from './router/router';

new Vue({
  el: '#app',
  store,
  router
});

