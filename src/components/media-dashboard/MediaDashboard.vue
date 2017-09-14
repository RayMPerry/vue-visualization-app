<template>
  <div :class="currentLayout">
    <div class="one">
      <span>Main Panel</span>
    </div>
    <div class="two">
      <span>Social Feed</span>
    </div>
    <div class="three">
      <span>News Feed</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ScheduleComponent from '../schedule/ScheduleComponent.vue';
import NewsfeedComponent from '../newsfeed/NewsfeedComponent.vue';
import TwitterComponent from '../twitter/TwitterComponent.vue';

export default {
  computed: {
    ...mapState({
      layout: ({ MediaDashboardStore }) => MediaDashboardStore.layout
    }),
    currentLayout () {
      const classObject = {
        "media-dashboard": true
      };

      classObject['layout'+ this.layout] = true;

      return classObject;
    }
  },
  components: {
    ScheduleComponent,
    NewsfeedComponent,
    TwitterComponent
  }
}
</script>

<style>
* {
    box-sizing: border-box;
}

html,
body {
    background: black;
    color: white;

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

.media-dashboard {
    position: relative;
    width: 100%;
    height: 100%;
}

.layout1 {
    position: relative;
    
    .one,
    .two,
    .three {
        position: absolute;
        display: block;
        padding: 5px;
    }
    
    .one {
        /* background: red; */
        left: 0;
        width: 67%;
        height: 67%;
    }
    .two {
        /* background: blue; */
        right: 0;
        width: 33%;
        height: 100%;
    }
    .three {
        /* background: green; */
        bottom: 0;
        width: 67%;
        height: 33%;
    }
}
</style>
