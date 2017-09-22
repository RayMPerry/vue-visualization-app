import {
  ADMIN_ADVANCE_DATE,
  ADMIN_UPDATE,
  ADMIN_CHANGE_DATE,
  ADMIN_GET_TIME,
  MEDIA_DASHBOARD_CHANGE_LAYOUT,
  MEDIA_DASHBOARD_REFRESH_ALL,
  MEDIA_DASHBOARD_BUILD_LONG_TEXT
} from '../mutation-types';

const state = {
  currentTime: '',
  currentDayOffset: 0,
  currentYear: 0,
  currentMonth: 0,
  currentDay: 0,
  currentIntervalDifference: 0,
  layout: 1,
  longTextDays: [],
  startMonth: null,
  startDay: null,
  startYear: null
};

const mutations = {
  [ADMIN_GET_TIME] (state) {
    const currentDate = new Date();
    // Push a 0 onto the time string and cut off the back 2.
    const formattedHours = ("0" + currentDate.getHours()).slice(-2);
    const formattedMinutes = ("0" + currentDate.getMinutes()).slice(-2);
    state.currentTime = formattedHours + ":" + formattedMinutes;
    // Subtract the difference in seconds from 60 and multiply to get milliseconds.
    state.currentIntervalDifference = (60 - currentDate.getSeconds()) * 1000;
  },
  [ADMIN_CHANGE_DATE] (state, payload) {
    const parsedDate = payload.date.split('/');
    state.currentMonth = parsedDate[0];
    state.currentDay = parsedDate[1];
    state.currentYear = parsedDate[2];

    if (payload.origin) {
      state.startMonth = parsedDate[0];
      state.startDay = parsedDate[1];
      if (parseInt(parsedDate[2]) < 2000) {
        state.startYear = parseInt(parsedDate[2]) + 2000;
      } else {
        state.startYear = parsedDate[2];
      }
    }
  },
  [MEDIA_DASHBOARD_CHANGE_LAYOUT] (state, layout) {
    state.layout = layout
  },
  [MEDIA_DASHBOARD_BUILD_LONG_TEXT] (state, longTextArr) {
    state.longTextDays = longTextArr;
  }
};
const getters = {};
const actions = {
  [ADMIN_ADVANCE_DATE] ({ rootState, state, commit }) {
    state.currentDayOffset++;

    const schedule = rootState.ScheduleStore.schedule;
    const currentDate = [
      parseInt(state.startMonth),
      parseInt(state.startDay) + state.currentDayOffset,
      state.startYear - 2000,
    ].join('/');
    
    if (!schedule[currentDate] || schedule[currentDate].length < 0 || state.currentDayOffset > 2) {
      state.currentDayOffset = 0;
    }
    
    const newDate = [
      state.startMonth,
      parseInt(state.startDay) + state.currentDayOffset,
      state.startYear
    ].join('/');
    commit(ADMIN_CHANGE_DATE, {date: newDate});
  },
  [ADMIN_UPDATE] ({ commit }) {
    const newDate = [
      state.startMonth,
      parseInt(state.startDay) + 1,
      state.startYear
    ].join('/');
    commit(ADMIN_CHANGE_DATE, {date: newDate, origin: true});
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
