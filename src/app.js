import Vue from 'vue';
import Vuex from 'vuex';
//import VueRouter from 'vue-router';

import MediaDashboard from './components/media-dashboard/MediaDashboard.vue';
import store from './store/appStore';
// import router from './router/router';

// Vue.use(VueRouter);

new Vue({
  el: '#app',
  store,
  components: {
    MediaDashboard
  }
});

