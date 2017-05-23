<template lang="html">
  <div class="container">
    <div class="row" v-for="day in orderedByDay">
      <div class="col s12">
        <h4 class="center">{{ day.date.format('dddd, MMMM Do YYYY') }}</h4>
        <pie-chart class="col s4 offset-s4"
         :data="day.chartData"
         :options="{responsive: true, maintainAspectRatio: true}"
         ></pie-chart>
         <div class="col s4">
           <ul>
             <li>Submitted: {{ day.totalSubmitted }}</li>
             <li>Missing: {{ 19 - day.totalSubmitted }}</li>
           </ul>
         </div>
        <table class="striped bordered">
          <thead>
            <tr>
              <th v-for=" heading in day.headings">{{ heading }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in day.students">
              <td v-for="item of row">{{ item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/

import _ from 'lodash';
import PieChart from '../charts.js'

export default {
  name: 'Day',
  components: {
    PieChart
  },
  data: function () {
    return {

    }
  },
  methods: {

  },
  mounted: function () {

  },
  props: ['rows', 'tableCols', 'orderedByDay'],
}
</script>

<style lang="css">
</style>
