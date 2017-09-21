<template>
  <div :class="currentLayout">
    <footer-component></footer-component>
    <div class="one">
      <schedule-component></schedule-component>
    </div>
    <div class="two">
      <twitter-component></twitter-component>
    </div>
    <div class="three">
      <newsfeed-component></newsfeed-component>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import * as types from '../../store/mutation-types';

import ScheduleComponent from '../schedule/ScheduleComponent.vue';
import NewsfeedComponent from '../newsfeed/NewsfeedComponent.vue';
import TwitterComponent from '../twitter/TwitterComponent.vue';
import FooterComponent from '../footer/FooterComponent.vue';

export default {
  computed: {
    ...mapState({
      layout: ({ MediaDashboardStore }) => MediaDashboardStore.layout,
      currentIntervalDifference: ({ MediaDashboardStore }) => MediaDashboardStore.currentIntervalDifference
    }),
    currentLayout () {
      const classObject = {
        "media-dashboard": true
      };

      classObject['layout'+ this.layout] = true;

      return classObject;
    }
  },
  methods: {
    ...mapMutations({
      getTime: types.ADMIN_GET_TIME
    }),
    ...mapActions({
      nextDay: types.ADMIN_ADVANCE_DATE
    })
  },
  mounted () {
    const self = this;
    window.setInterval(self.nextDay, 13000);

    // This initializes the time.
    self.getTime();
    window.setTimeout(function () {
      // Refresh the time
      self.getTime();
      // Get the time every minute.
      window.setInterval(self.getTime, 60000);
    }, self.currentIntervalDifference);

    
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
$headline-fonts: 'Roboto', sans-serif;
$body-fonts: 'Open Sans', sans-serif;

$twitter-color: #55acee;
$footer-color: #00b0de;

* {
    /* background: rgba(0,0,0,0.1) !important; */
    box-sizing: border-box;
}

html,
body {
    background: white;
    color: black;
    font-family: $body-fonts;
    
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
                       
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
    
.media-dashboard {
    position: relative;
    width: 100%;
    height: 100%;
    
    .one,
    .two,
    .three,
    .footer {
        position: absolute;
        display: block;
        overflow: hidden;
    }

    &.layout1 {
        position: relative;
        
        .one {
            top: 10%;
            left: 0;
            width: 75%;
            height: 75%;
        }
        .two {
            top: 10%;
            right: 0;
            width: 25%;
            height: 90%;
            background: #aaa;
        }
        .three {
            top: 90%;
            width: 75%;
            height: 10%;
            background: #54C0A0;
        }
        .footer {
            background: $footer-color;
            background: -moz-linear-gradient(left, #00b0de 0%,#006c87 78%,#006c87 100%); 
            background: -webkit-linear-gradient(left, #00b0de 0%,#006c87 78%,#006c87 100%); 
            color: white;
            top: 0;
            width: 100%;
            height: 10%;
            padding: 0 20px;
            vertical-align: middle;
        }
    }

}
</style>
