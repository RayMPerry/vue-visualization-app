import {
  MEDIA_DASHBOARD_CHANGE_LAYOUT,
  MEDIA_DASHBOARD_REFRESH_ALL
} from '../mutation-types';

const state = {
  layout: 1
};

const mutations = {
  [MEDIA_DASHBOARD_CHANGE_LAYOUT] (state, layout) {
    state.layout = layout
  }
};
const getters = {};
const actions = {};

export default {
  state,
  mutations,
  getters,
  actions
};
