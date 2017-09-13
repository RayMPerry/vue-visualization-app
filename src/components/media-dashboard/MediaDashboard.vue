<template>
<div class="media-dashboard">
<p v-text="message"></p>
</div>
</template>

<script>
export default {
data () {
return {
message: 'Hello, I\'m the new media dashboard.'
}
}
}
</script>

<style>
.media-dashboard {
background: red;
color: white;
}
</style>