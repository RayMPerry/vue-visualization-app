import {
  NEWSFEED_GET_ITEMS,
  NEWSFEED_NEXT_ITEM,
  NEWSFEED_SET_ITEM_INDEX,
  NEWSFEED_SET_NEW_ITEMS,
  NEWSFEED_REFRESH_CURRENT_ITEM
} from '../mutation-types';

import axios from 'axios';
import Papa from 'papaparse';

const state = {
  newsfeedFields: [],
  newsfeedItems: [],
  currentItemIndex: 0,
  currentItem: '',
};
const mutations = {
  [NEWSFEED_SET_NEW_ITEMS] (state, items) {
    state.newsfeedFields = items.shift();
    state.newsfeedItems = items;
  },
  [NEWSFEED_SET_ITEM_INDEX] (state) {
    state.currentItemIndex++;
    
    if (state.currentItemIndex >= state.newsfeedItems.length - 1) {
      state.currentItemIndex = 0;
    }
  },
  [NEWSFEED_REFRESH_CURRENT_ITEM] (state) {
    state.currentItem = state.newsfeedItems[state.currentItemIndex][0];
  }
};
const actions = {
  [NEWSFEED_GET_ITEMS] ({ commit }) {
    axios.get('/newsfeed')
      .then(csvFile => {
        Papa.parse(csvFile.data, {
          complete: (results) => {
            commit(NEWSFEED_SET_NEW_ITEMS, results.data);
            commit(NEWSFEED_REFRESH_CURRENT_ITEM);
          }
        });
      });
  },
  [NEWSFEED_NEXT_ITEM] ({ commit }) {
    commit(NEWSFEED_SET_ITEM_INDEX);
    commit(NEWSFEED_REFRESH_CURRENT_ITEM);
  }
};
const getters = {};

export default {
  state,
  mutations,
  getters,
  actions
};
