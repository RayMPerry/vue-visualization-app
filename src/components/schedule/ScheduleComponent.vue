<template>
  <div class="schedule">
    <div class="event" v-for="event in schedule" v-if="isEventToday(event[0])">
      <p class="event-date" v-text="scheduleFields[0] + ': ' + event[0]"></p>
      <p class="event-time" v-text="scheduleFields[1] + ': ' + event[1]"></p>
      <p class="event-details" v-text="scheduleFields[2] + ': ' + event[2]"></p>
      <p class="event-presenter" v-text="scheduleFields[3] + ': ' + event[3]"></p>
      <p class="event-location" v-text="scheduleFields[4] + ': ' + event[4]"></p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import * as types from '../../store/mutation-types';

export default {
  computed: {
    ...mapState({
      schedule: ({ ScheduleStore }) => ScheduleStore.schedule,
      scheduleFields: ({ ScheduleStore }) => ScheduleStore.scheduleFields,
      eventStartDate: ({ MediaDashboardStore }) => MediaDashboardStore.startDate
    })
  },
  methods: {
    isEventToday (eventDate) {
      if (eventDate.indexOf(this.eventStartDate) > -1) {
        return true;
      } 

      return false;
    },
    ...mapMutations({
      changeDate: types.ADMIN_CHANGE_DATE
    }),
    ...mapActions({
      refreshSchedule: 'getCurrentSchedule'
    })
  },
  mounted () {
    this.refreshSchedule();
    this.changeDate('Mon. Sep. 25');
  }
}
</script>

<style>
.schedule {
    .event {
        background: #9933ff;
        padding: 5px;
        margin-bottom: 5px;
        
        &-date,
        &-time,
        &-details,
        &-presenter,
        &-location {
            margin: 0;
        }
    }
}
</style>
