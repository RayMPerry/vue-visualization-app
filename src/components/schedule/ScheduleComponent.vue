<template>
  <transition name="fade" mode="out-in">
    <div class="schedule" v-if="schedule" :key="currentDate">
      <div class="event" v-for="(event, index) in schedule[currentDate]" :key="index">
        <p class="event-time">
          <span class="event-begin-time" v-text="formatTime(event[1])"></span> - <span class="event-end-time" v-text="formatTime(event[2])"></span>
          <span class="event-details" v-text="event[3]"></span> (<span class="event-company" v-text="event[5]"></span>).
          <span class="event-location" v-text="formatLocation(event[6])"></span>
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import * as types from '../../store/mutation-types';
import * as constants from '../../constants';

export default {
  computed: {
    ...mapState({
      currentDay: ({ MediaDashboardStore }) => MediaDashboardStore.currentDay,
      currentDayOffset: ({ MediaDashboardStore }) => MediaDashboardStore.currentDayOffset,
      schedule: ({ ScheduleStore }) => ScheduleStore.schedule,
      scheduleFields: ({ ScheduleStore }) => ScheduleStore.scheduleFields,
      eventStartMonth: ({ MediaDashboardStore }) => MediaDashboardStore.startMonth,
      eventStartDay: ({ MediaDashboardStore }) => MediaDashboardStore.startDay,
      eventStartYear: ({ MediaDashboardStore }) => MediaDashboardStore.startYear
    }),
    eventStartDate () {
      return [
        this.eventStartMonth,
        this.eventStartDay,
        this.eventStartYear
      ].join('/');
    },
    currentDate () {
     return [
        parseInt(this.eventStartMonth),
        parseInt(this.eventStartDay) + this.currentDayOffset,
        this.eventStartYear
      ].join('/');
    }
  },
  methods: {
    getCurrentSchedule () {
      if (this.schedule) {
        return this.schedule[this.currentDate];
      } else {
        return false;
      }
    },
    formatTime (timeToFormat) {
      let tempTime = timeToFormat.split(':');
      const tempHours = parseInt(tempTime[0]);
      if (tempHours > 12) {
        tempTime[0] = ('0' + (tempHours - 12)).slice(-2);
        tempTime[1] += 'pm'; 
      } else {
        tempTime[1] += 'am';
      }
      return tempTime.join(':');
    },
    formatLocation (locationToFormat) {
      const hcpRegex = /Healthcare Packaging EXPO$/gi;
      let tempLocation = locationToFormat.replace(hcpRegex, '').replace('|', '');
      return tempLocation;
    },
    isEventToday (eventDate) {
      return (eventDate.indexOf(this.currentDay) > -1) ? true : false;
    },
    ...mapMutations({
      changeDate: types.ADMIN_CHANGE_DATE,
      modifySchedule: types.SCHEDULE_MODIFY,
      buildDayArray: types.MEDIA_DASHBOARD_BUILD_LONG_TEXT
    }),
    ...mapActions({
      refreshSchedule: types.SCHEDULE_GET_CURRENT_SCHEDULE
    })
  },
  created () {
    this.refreshSchedule();
    this.changeDate({date: '09/25/17', origin: true});
    const tempMonth = this.eventStartMonth - 1;
    const tempDay = parseInt(this.eventStartDay) + 2;
    let tempLongDay = new Date(this.eventStartYear, tempMonth, tempDay).getDay();
    tempLongDay = constants.daysOfWeek[tempLongDay];
    this.buildDayArray(['Today', 'Tomorrow', tempLongDay]);
  }
}
</script>

<style>
.schedule {
    .event {
        padding: 0 20px;
        font-size: 26px;
        
        &-date,
        &-location {
            margin: 0;
            font-style: italic;
        }

        &-begin-time,
        &-end-time {
            margin: 0;
            font-weight: bold;
        }

        &-end-time {
            padding-right: 10px;
        }
    }
}
</style>
