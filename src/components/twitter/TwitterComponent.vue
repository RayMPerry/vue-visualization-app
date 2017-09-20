<template>
  <div class="twitter">
    <div class="tweet" v-for="tweet in tweets">
      <p>
        <img class="tweet-image" :src="tweet.user.profile_image_url" />
        <p class="tweet-names">
          <a :href="'http://twitter.com/' + tweet.user.screen_name" class="tweet-name" v-text="tweet.user.name"></a><br/>
          <span class="tweet-user-name" v-text="'@' + tweet.user.screen_name"></span>
        </p>
        <p class="tweet-content">
          <span class="tweet-text" v-text="tweet.text"></span>
        <p>
        <span class="tweet-create-date" v-text="new Date(tweet.created_at).toString()"></span>
      </p>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import axios from 'axios';
  import io from 'socket.io-client';
import * as types from '../../store/mutation-types';

const socketHost = 'http://127.0.0.1';
const socketPort = 6465;

export default {
  computed: {
    ...mapState({
      tweets: ({ TwitterStore }) => TwitterStore.tweets
    })
  },
  methods: {
    ...mapMutations({
      addTweet: types.TWITTER_ADD_TWEET
    })
  },
  created () {
    const socket = io(socketHost + ':' + socketPort);
    socket.on('action', action => {
      this.addTweet(action.data);
    });
  },
  mounted () {
    axios.get('/twitter').then(response => {
      console.log(response);
    });
  }
  
  }
</script>

<style>
.twitter {
    .tweet {
        background: white;
        margin: 10px;
        padding: 10px;
        box-shadow: 3px 4px 5px 0px rgba(0,0,0,0.25);
        
        &-name,
        &-user-name,
        &-create-date,
        &-text {

        }

        &-name {
            font-weight: bold;
            text-decoration: none;
            color: #55acee;
        }

        &-user-name {
            font-style: italic;
            color: #66757f;
        }

        &-names {
            float: left;
            margin: 5px;
        }
        
        &-image {
            float: left;
            border-radius: 50px;
            border: 3px solid #ddd;
        }

        &-content {
            clear: both;
            padding: 10px;
        }

        &-create-date {
            font-size: 0.8em;
            color: #66757f;
            padding: 10px;
        }
        
    }
}
</style>
