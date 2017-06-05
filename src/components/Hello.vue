<template>
<div class="row container">
  <div class="col s12 center">
    <h3>Filter Survey Responses</h3>
  </div>
  <div class="col s4">
    <div class="row">
      <div class="col s12">
        <router-link to="/today" class="waves-effect waves-light btn-large">Today Only</router-link>
      </div>
    </div>
  </div>
  <div class="col s4">
    <div class="row">
      <div class="col s12">
        <router-link to="/recent" class="waves-effect waves-light btn-large">Last 5 Weeks</router-link>

      </div>
    </div>
  </div>
  <div class="col s4">
    <div class="row">
      <div class="col s12">
        <router-link to="/by-day" class="waves-effect waves-light btn-large">All Days</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      today: [this.orderedByDay[0]]
    };
  },
  props: ['orderedByDay'],
};
</script>

<style scoped>

.container {
  margin-top: 50%;
}

</style>
