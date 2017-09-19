<template>
  <div class="newsfeed">
    <transition name="fade" mode="out-in">
      <h3 class="news-item" v-text="currentItem" :key="currentItem">Newsfeed Panel</h3>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import * as types from '../../store/mutation-types';

export default {
  computed: {
    ...mapState({
      items: ({ NewsfeedStore }) => NewsfeedStore.newsfeedItems,
      currentItem: ({ NewsfeedStore }) => NewsfeedStore.currentItem
    }),
  },
  methods: {
    ...mapActions({
      nextItem: types.NEWSFEED_NEXT_ITEM,
      getNewItems: types.NEWSFEED_GET_ITEMS
    })
  },
  mounted () {
    this.getNewItems();
    window.setInterval(this.nextItem, 5000);
  }
}
</script>

<style>
.newsfeed {
    padding: 20px;
    font-size: 26px;
    background: #54C0A0;
    color: white;
    .news-item {
        margin: 0;
    }
}
</style>
