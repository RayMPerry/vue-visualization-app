import Vue from 'vue';
import VueRouter from 'vue-router';

import MediaDashboard from '../components/media-dashboard/MediaDashboard.vue';
import AdminDashboard from '../components/admin-dashboard/AdminDashboard.vue';
import NotFoundComponent from '../components/not-found/NotFoundComponent.vue';

const routes = [
  {
    path: '/',
    component: MediaDashboard
  },
  {
    path: '/admin',
    component: AdminDashboard
  },
  {
    path: '*',
    component: NotFoundComponent
  }
];

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes
});
