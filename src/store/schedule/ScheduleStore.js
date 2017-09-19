import axios from 'axios';
import Papa from 'papaparse';
import {
  SCHEDULE_REFRESH,
  SCHEDULE_MODIFY,
  SCHEDULE_GET_CURRENT_SCHEDULE
} from '../mutation-types';

const state = {
  schedule: null,
  scheduleFields: null
};
const mutations = {
  [SCHEDULE_REFRESH] (state, newSchedule) {
    state.scheduleFields = newSchedule.shift();
    state.schedule = newSchedule;
  },
  [SCHEDULE_MODIFY] (state, newSchedule) {
    state.schedule = newSchedule;
  }
};
const actions = {
  [SCHEDULE_GET_CURRENT_SCHEDULE] ({ commit }) {
    axios.get('/schedule')
      .then(csvFile => {
        Papa.parse(csvFile.data, {
          complete: (results) => {
            commit(SCHEDULE_REFRESH, results.data);
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
