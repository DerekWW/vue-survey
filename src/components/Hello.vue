<template>
<div class="row container">
  <div class="col s12 center">
    <h3>Filter Survey Responses</h3>
  </div>
  <div class="col s4">
    <div class="row">
      <div class="col s12">
        <router-link to="/filter-question" class="waves-effect waves-light btn-large">By Question</router-link>
      </div>
    </div>
  </div>
  <div class="col s4">
    <div class="row">
      <div class="col s12">
        <router-link to="/by-day" class="waves-effect waves-light btn-large">By Day</router-link>
      </div>
    </div>
  </div>
  <div class="col s4">
    <div class="row">
      <div class="col s12">
        <a class="waves-effect waves-light btn-large">Button</a>

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
    };
  },
  props: ['rows', 'tableCols'],
};
</script>

<style scoped>

</style>
