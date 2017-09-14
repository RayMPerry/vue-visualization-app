import axios from 'axios';
import Papa from 'papaparse';
import * as types from '../mutation-types';

const state = {
  schedule: null,
  scheduleFields: null
};
const mutations = {
  [types.SCHEDULE_REFRESH] (state, newSchedule) {
    state.scheduleFields = newSchedule.shift();
    state.schedule = newSchedule;
  }
};
const actions = {
  getCurrentSchedule ({ commit }) {
    axios.get('/schedule')
      .then(csvFile => {
        Papa.parse(csvFile.data, {
          complete: (results) => {
            commit(types.SCHEDULE_REFRESH, results.data);
          }
        });
      });
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
