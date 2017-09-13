import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import MediaDashboard from './components/media-dashboard/MediaDashboard.vue';

Vue.use(Vuex);
Vue.use(VueRouter);

new Vue({
    el: '#app',
    components: {
        MediaDashboard
    }
});

