import Vue from 'vue';
import Vuex from 'vuex';

import MediaDashboardStore from './media-dashboard/MediaDashboardStore';
import TwitterStore from './twitter/TwitterStore';
import NewsfeedStore from './newsfeed/NewsfeedStore';
import ScheduleStore from './schedule/ScheduleStore';

const state = {};
const mutations = {};
const getters = {};
const actions = {};
const modules = {
  MediaDashboardStore,
  TwitterStore,
  NewsfeedStore,
  ScheduleStore
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules
});
