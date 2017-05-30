<template lang="html">
  <div class="container">
    <div class="row" v-for="day in recent">
      <div class="col s12">
        <h4 class="center">{{ day.date.format("dddd, MMMM Do YYYY") }}</h4>
        <div class="col s6">
          <div class="row">
            <div class="col s2">
              <u>Great!</u>
              <ul id="great">
                <li v-for="person in day.emotions.great">{{ person }}</li>
              </ul >
            </div>
            <div class="col s2" >
              <u>Good!</u>
              <ul id="good">
                <li v-for="person in day.emotions.good">{{ person }}</li>
              </ul>
            </div>
            <div class="col s2">
              <u>Meh</u>
              <ul id="meh">
                <li v-for="person in day.emotions.meh">{{ person }}</li>
              </ul>
            </div>
            <div class="col s2">
              <u>Terrible</u>
              <ul  id="terrible">
                <li v-for="person in day.emotions.terrible">{{ person }}</li>
              </ul>
            </div>
          </div>

        </div>
        <pie-chart class="col s4"
         :data="day.chartData"
         :options="{responsive: true, maintainAspectRatio: true}"
         ></pie-chart>
         <div class="col s2 center">
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
import PieChart from '../charts.js'

export default {
  name: 'Recent',
  components: {
    PieChart
  },
  data: function () {
    return {
      recent: this.orderedByDay.slice(0, 25)
    }
  },
  props: ['orderedByDay']
}

</script>

<style lang="css" scoped>

#great {
  background-color: rgba(24,255,0, 0.2)
}

#good {
  background-color: rgba(66, 232, 244, 0.2)
}

#meh {
  background-color: rgba(241, 247, 66, 0.2)
}

#terrible {
  background-color: rgba(247, 72, 65, 0.2)
}
</style>
