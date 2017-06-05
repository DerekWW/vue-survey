<template lang="html">
  <div class="container">
    <div class="row" v-for="day in today">
      <div class="col s12">
        <h4 class="center">{{ day.date.format("dddd, MMMM Do YYYY") }}</h4>
        <div class="col s6">
          <div class="row">
            <div class="col s2">
              <u>Great!</u>
              <ul id="great">
                <li v-for="person in day.emotions[0]">{{ person }}</li>
              </ul >
            </div>
            <div class="col s2" >
              <u>Good!</u>
              <ul id="good">
                <li v-for="person in day.emotions[1]">{{ person }}</li>
              </ul>
            </div>
            <div class="col s2">
              <u>Meh</u>
              <ul id="meh">
                <li v-for="person in day.emotions[2]">{{ person }}</li>
              </ul>
            </div>
            <div class="col s2">
              <u>Terrible</u>
              <ul  id="terrible">
                <li v-for="person in day.emotions[3]">{{ person }}</li>
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
import _ from 'lodash'

/*eslint-disable*/
export default {
  name: 'Today',
  components: {
    PieChart
  },
  data: function(){
    return {
      today: _.cloneDeep([this.orderedByDay[0]]),
      yesterday: [this.orderedByDay[1]],

    }
  },
  beforeMount: function() {
    //check todays emotional state vs yesterdays emotional state
    this.today[0].emotions.forEach((todayEmotion, todayIndex) => {

      todayEmotion.forEach((todayPerson, personIndex) => {

        this.yesterday[0].emotions.forEach((yesterdayEmotion, yesterdayIndex) => {
          if (yesterdayEmotion.indexOf(todayPerson) !== -1) {
            if (todayIndex > yesterdayIndex) {
              todayEmotion[personIndex] += ' 👎'
            } else if (todayIndex === yesterdayIndex) {
              todayEmotion[personIndex]
            } else if (todayIndex < yesterdayIndex) {
              todayEmotion[personIndex] += ' 👍'
            }

          }
        })

      })

    })
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
