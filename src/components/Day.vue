<template lang="html">
  <div class="container">
    <div class="row" v-for="day in orderedByDay">
      <div class="col s12">
        <h4 class="center">{{ day.date.format().slice(0, 10) }}</h4>
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

export default {
  name: 'Day',
  data: function () {
    return {
      orderedByDay: [ ],
      dateObjArr: [ ],
      tableHeadings: { },
      myRows: ''
    }
  },
  methods: {
    pushObj: function(obj){
      this.orderedByDay.push(obj)
    }
  },
  mounted: function () {
    this.myRows = _.cloneDeep(this.rows);
    // console.log(this.myRows);

    // go through each row and make a array of objects, each object a new date
    this.myRows.forEach((row) => {
      let newDayObj;

      let hasDateArr = this.orderedByDay.filter(function(dayObj) {
        return dayObj.date.isSame(row[0], 'day')
      })

      if (!hasDateArr.length) {
        newDayObj = {
          date: row[0]
        }

        this.orderedByDay.push(newDayObj)
      }

    })

    // console.log(this.orderedByDay);

    // for each day object, loop through rows and push them into a students array on that object
    this.orderedByDay.forEach((day) => {
      day.students = [];
      this.myRows.forEach(function(row) {
        if (day.date.isSame(row[0], 'day')) {
          day.students.push(row)
        }
      })

    })


    this.orderedByDay.forEach((day) => {
      day.headings = [];
      let headingIndexs = [];
      let longestStudent = 0;

      //find longest index for a given day, since longest index will have the most questions answered
      day.students.forEach((student, index) => {
        if (student.length >= longestStudent) {
          longestStudent = index;
        }

      })


      day.students.forEach((student) => {
        student.forEach((answer, index) => {
          if (answer !== '' && day.headings.indexOf(this.tableCols[index]) === -1) {
            day.headings.push(this.tableCols[index])
            headingIndexs.push(index)
          }
        })
      })

      day.students.forEach((student) => {

        headingIndexs.forEach((index) => {
          if (!student[index]) {
            student[index] = 'N/A'
          }
        })

        _.remove(student, (el) => {
          return !el
        })

      })
    })

    this.orderedByDay.reverse()
  },
  props: ['rows', 'tableCols']
}
</script>

<style lang="css">
</style>
