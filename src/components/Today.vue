<template lang="html">
  <div class="container">
    <div class="row" v-for="day in today">
      <div class="col s12">
        <h4 class="center">{{ day.date.format("dddd, MMMM Do YYYY") }}</h4>
        <pie-chart class="col s4 offset-s4"
         :data="day.chartData"
         :options="{responsive: true, maintainAspectRatio: true}"
         ></pie-chart>
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
import PieChart from '../charts.js'

/*eslint-disable*/
export default {
  name: 'Today',
  components: {
    PieChart
  },
  data: function(){
    return {
      today: [this.orderedByDay[0]]
    }
  },

  created: function() {
    $(document).ready(function() {
      $('select').material_select()
    });
  },
  props: ['rows', 'tableCols', 'orderedByDay']
}
</script>

<style lang="css">
</style>
