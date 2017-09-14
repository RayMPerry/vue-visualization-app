import {
  ADMIN_CHANGE_DATE,
  MEDIA_DASHBOARD_CHANGE_LAYOUT,
  MEDIA_DASHBOARD_REFRESH_ALL
} from '../mutation-types';

const state = {
  layout: 1,
  startDate: null,
};

const mutations = {
  [ADMIN_CHANGE_DATE] (state, date) {
    state.startDate = date;
  },
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
