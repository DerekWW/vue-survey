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
      orderedByDay: [ ],
      dateObjArr: [ ],
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

    tempRows.forEach((row) => {
      let newDayObj;

      let hasDateArr = this.orderedByDay.filter(function(dayObj) {
        return dayObj.date.isSame(row[0], 'day')
      })

      if (!hasDateArr.length) {
        newDayObj = {
          date: row[0]
        }

        this.pushObj(newDayObj)
      }

    })

    this.orderedByDay.forEach((day) => {
      day.students = [];
      this.rows.forEach(function(row) {
        if (day.date.isSame(row[0], 'day')) {
          day.students.push(row)
        }
      })

    })

    this.orderedByDay.forEach((day) => {
      day.headings = [];
      let headingIndexs = [];
      let longestStudent = -1;

      day.students.forEach((student, index) => {
        if (student.length > longestStudent) {
          longestStudent = index;
        }
      })

      day.students[longestStudent].forEach((rowEntry, index) => {
        if (rowEntry !== '') {
          day.headings.push(this.tableCols[index])
          headingIndexs.push(index)
        }
      })

      day.students.forEach((student) => {
        headingIndexs.forEach((index) => {
          if (!student[index]) {
            student[index] = 'N/A'
          }
        })
      })





    })




  },
  props: ['rows', 'tableCols']
}
</script>

<style lang="css">
</style>
