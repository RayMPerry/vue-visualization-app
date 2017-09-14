<template>
  <div :class="currentLayout">
    <div class="one">
      <schedule-component></schedule-component>
    </div>
    <div class="two">
      <twitter-component></twitter-component>
    </div>
    <div class="three">
      <newsfeed-component></newsfeed-component>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ScheduleComponent from '../schedule/ScheduleComponent.vue';
import NewsfeedComponent from '../newsfeed/NewsfeedComponent.vue';
import TwitterComponent from '../twitter/TwitterComponent.vue';
import FooterComponent from '../footer/FooterComponent.vue';

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
    TwitterComponent,
    FooterComponent
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

    $panel1-color: red;
    $panel2-color: blue;
    $panel3-color: green;
    $footer-color: black;
    
    .one,
    .two,
    .three,
    .footer {
        position: absolute;
        display: block;
        padding: 5px;
        overflow: hidden;
    }

    &.layout1 {
        position: relative;
        
        .one {
            background: $panel1-color;
            left: 0;
            width: 75%;
            height: 75%;
        }
        .two {
            background: $panel2-color;
            right: 0;
            width: 25%;
            height: 90%;
        }
        .three {
            background: $panel3-color;
            top: 75%;
            width: 75%;
            height: 15%;
        }
        .footer {
            background: $footer-color;
            bottom: 0;
            width: 100%;
            height: 10%;
        }
    }

}
</style>
