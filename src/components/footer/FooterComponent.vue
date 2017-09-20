<template>
  <div class="footer" @click="nextDay()">
    <transition name="fade" mode="out-in">
      <h1 class="date-and-time" :key="currentDayOffset">
        <span v-text="whichDay"></span> at Healthcare Packaging EXPO
      </h1>
    </transition>
    <div class="hcp-logo">
      <img src="/logo.png" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import * as types from '../../store/mutation-types';
import * as constants from '../../constants';

export default {
  computed: {
    ...mapState({
      longTextDays: ({ MediaDashboardStore }) => MediaDashboardStore.longTextDays,
      eventStartMonth: ({ MediaDashboardStore }) => MediaDashboardStore.startMonth,
      eventStartDay: ({ MediaDashboardStore }) => MediaDashboardStore.startDay,
      eventStartYear: ({ MediaDashboardStore }) => MediaDashboardStore.startYear,
      currentTime: ({ MediaDashboardStore }) => MediaDashboardStore.currentTime,
      currentDayOffset: ({ MediaDashboardStore }) => MediaDashboardStore.currentDayOffset
    }),
    currentDate () {
      return [
        this.eventStartMonth,
        this.eventStartDay,
        this.eventStartYear
      ].join('/');
    },
    verboseCurrentDate () {
      let month = parseInt(this.eventStartMonth) - 1;
      const verboseMonth = constants.monthsOfYear[month];
      const verboseDay = this.eventStartDay;
      const verboseYear = this.eventStartYear;

      return verboseMonth + ' ' + verboseDay + ', ' + verboseYear;
    },
    whichDay () {
      return this.longTextDays[this.currentDayOffset];
    }
  },
  methods: {
    ...mapActions({
      nextDay: types.ADMIN_ADVANCE_DATE
    })
  }
}
</script>

<style>
$headline-fonts: 'Roboto', sans-serif;
$body-fonts: 'Open Sans', sans-serif;

.footer {
    font-family: $headline-fonts;
    .clock {
        float: right;
    }

    .date-and-time {
        float: left;
    }
    
    .hcp-logo {
        float: right;
        width: 10%;
        height: 90%;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
