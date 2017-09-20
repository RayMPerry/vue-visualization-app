<template>
  <div class="admin-dashboard">
    <p v-if="!scheduleUploaded">Upload Schedule CSV: <input type="file" name="schedule" @change="uploadScheduleFile" /></p>
    <p v-if="!factoidsUploaded">Upload Factoids CSV: <input type="file" name="factoids" @change="uploadFactoidsFile" /></p>
    <h2 v-if="scheduleUploaded && !factoidsUploaded">Schedule uploaded!</h2>
    <h2 v-if="!scheduleUploaded && factoidsUploaded">Factoids uploaded!</h2>
    <h1 v-if="scheduleUploaded && factoidsUploaded">All done!</h1>
    <h3 v-if="scheduleUploaded || factoidsUploaded">Please refresh the info display.</h3>
  </div>
</template>

<script>
import axios from 'axios';
  
export default {
  data () {
    return {
      scheduleUploaded: false,
      factoidsUploaded: false
    };
  },
  computed: {},
  methods: {
    uploadScheduleFile (event) {
      const files = event.target.files || event.dataTransfer.files;
      console.log('Schedule event: ', event); 
      console.log('Schedule file list: ', files); 
      if (files.length) {
        console.log('Schedule file: ', files[0]);
        const fileToUpload = new FormData();
        fileToUpload.append('file', files[0]);
        axios.post('/uploadSchedule', fileToUpload).then(response => {
          console.log('Response from server: ', response);
          if (response.status === 201) {
            this.scheduleUploaded = true;
          }
        });
      }
    },
    uploadFactoidsFile (event) {
      const files = event.target.files || event.dataTransfer.files;
      console.log('Factoids event: ', event); 
      console.log('Factoids file list: ', files); 
      if (files.length) {
        console.log('Factoids file: ', files[0]);
        const fileToUpload = new FormData();
        fileToUpload.append('file', files[0]);
        axios.post('/uploadFactoids', fileToUpload).then(response => {
          console.log('Response from server: ', response);
          if (response.status === 201) {
            this.factoidsUploaded = true;
          }
        });
      }
    }
  }
}
</script>

<style>
.admin-dashboard {
    .upload-files-button {

    }
}
</style>
