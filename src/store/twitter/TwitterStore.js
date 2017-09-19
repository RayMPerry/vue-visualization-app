import {
  TWITTER_GET_TWEETS,
  TWITTER_ADD_TWEET
} from '../mutation-types';

const state = {
  tweetStream: null,
  tweets: [
    {
      user: {
        name: '(raycat-rakittra)',
        screen_name: 'RaycatRakittra',
        profile_image_url: "http://pbs.twimg.com/profile_images/876816620240457728/LiPC9D7m_normal.jpg"
      },
      created_at: + new Date(),
      text: 'Twitter service started.'
    }
  ]
};
const mutations = {
  [TWITTER_ADD_TWEET] (state, tweet) {
    state.tweets.unshift(tweet);
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
