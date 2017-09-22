<template>
  <div class="footer-component">
    <transition name="fade" mode="out-in">
      <h1 class="date-and-time" :key="currentDayOffset">
        <span v-text="whichDay"></span> at Healthcare Packaging EXPO
      </h1>
    </transition>
    <div class="hcp-logo" @click="nextDay()">
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
      nextDay: types.ADMIN_UPDATE
    })
  }
}
</script>

<style>
$headline-fonts: 'Roboto', sans-serif;
$body-fonts: 'Open Sans', sans-serif;

.footer-component {
    font-family: $headline-fonts;
    display: table;
    height: 100%;
    width: 100%;
    position: absolute;
    padding: 0 20px;
    .clock {
        float: right;
    }

    .date-and-time {
        display: table-cell;
        vertical-align: middle;
        width: 90%;
    }
    
    .hcp-logo {
        display: table-cell;
        width: 10%;
        height: 10%;
        img {
            padding: 5px 10px;
            width: 100%;
        }
    }
}
</style>
