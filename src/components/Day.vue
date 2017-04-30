<template lang="html">
  <div class="container">
    here
    <!-- <div class="row" v-for="day in sortedDatesArr">
      <div class="col s12">
        <h4 class="center">{{ day.slice(0, 10) }}</h4>
        <table class="bordered">
          <thead>
            <tr>
              <th v-for="heading in tableHeadings[day]">{{ heading }}</th>

            </tr>
          </thead>

          <tbody>
            <tr v-for="row of orderedByDay[day]">
              <td v-for="item of row">{{ item }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>

<script>
// import _ from 'lodash'
/*eslint-disable*/

export default {
  name: 'Day',
  data: function () {
    return {
      orderedByDay: [],
      dateObjArr: [],
      tableHeadings: { }
    }
  },
  methods: {
    pushObj: function(obj){
      this.orderedByDay.push(obj)
    }
  },
  created: function () {

    let tempRows = this.rows;

    tempRows.forEach(function(row) {
      let newDayObj;

      let hasDateArr = this.orderedByDay.filter(function(dayObj) {
        return dayObj.date
      })

      if (!hasDatArr.length) {
        newDayObj = {
          date: row[0]
        }

        this.pushObj(newDayObj)
      }



    })




  },
  props: ['rows', 'tableCols']
}
</script>

<style lang="css">
</style>
