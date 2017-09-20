import axios from 'axios';
import Papa from 'papaparse';
import {
  SCHEDULE_REFRESH,
  SCHEDULE_MODIFY,
  SCHEDULE_GET_CURRENT_SCHEDULE,
  SCHEDULE_UPDATE_SCHEDULE,
  SCHEDULE_UPDATE_FACTOIDS
} from '../mutation-types';

const state = {
  schedule: null,
  scheduleFields: null
};
const mutations = {
  [SCHEDULE_REFRESH] (state, newSchedule) {
    state.scheduleFields = newSchedule.scheduleFields;
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
            let newSchedule = {};
            let scheduleDates = [];
            let scheduleFields = results.data.shift();

            results.data.map((event, idx, arr) => {
              const isValidDate = event[0].match(/[\d]*\/[\d]*\/[\d]*/);
              if (isValidDate[0] !== "") {
                const eventDate = event[0];
                if (scheduleDates.indexOf(event[0]) < 0) {
                  scheduleDates.push(eventDate);
                }
                
                if (!newSchedule[eventDate] && typeof newSchedule[eventDate] !== 'object') {
                  newSchedule[eventDate] = [];
                }
                
                newSchedule[eventDate].push(event);
              }
            });
            
            newSchedule.scheduleFields = scheduleFields;
            commit(SCHEDULE_REFRESH, newSchedule);
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
