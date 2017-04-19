<template lang="html">
  <div class="container">
    <div class="row" v-for="day in sortedDatesArr">
      <div class="col s12">
        <h4 class="center">{{ day.slice(0, 10) }}</h4>
        <table>
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
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
/*eslint-disable*/

export default {
  name: 'Day',
  data: function () {
    return {
      orderedByDay: { },
      sortedDatesArr: [],
      tableHeadings: [ ]
    }
  },
  methods: {

  },
  mounted: function () {
    for (let i = 0; i < this.rows.length; i++) {
      if (!this.orderedByDay[this.rows[i][0].format()]) {
        this.orderedByDay[this.rows[i][0].format()] = [this.rows[i]]
        this.sortedDatesArr.push(this.rows[i][0].format())
      } else {
        this.orderedByDay[this.rows[i][0].format()].push(this.rows[i])
      }
    }
    this.sortedDatesArr.reverse()
    let tempOrderedByDay = this.orderedByDay
    for (let key in tempOrderedByDay) {
      let largestArr = 0
      let indexOfLargest
      let arrOfHeadings = []
      let goodIndexs = []

      for (let i = 0; i < tempOrderedByDay[key].length; i++) {
        if (tempOrderedByDay[key][i].length > largestArr) {
          indexOfLargest = i
          largestArr = tempOrderedByDay[key][i].length
        }

      }

      for (let i = 0; i < tempOrderedByDay[key][indexOfLargest].length; i++) {
        if (tempOrderedByDay[key][indexOfLargest][i]) {
          arrOfHeadings.push(this.tableCols[i])
          goodIndexs.push(i)
        }
      }

      for (let i = 0; i < tempOrderedByDay[key].length; i++) {
        // tempOrderedByDay[key][i] = tempOrderedByDay[key][i].filter(Boolean)
        for (let j = 0; j < largestArr; j++) {

          tempOrderedByDay[key][j].forEach((el, index) => {
            if (el === '' && goodIndexs.indexOf(index) !== -1) {
              console.log(tempOrderedByDay[key][j][index]);
              tempOrderedByDay[key][j][index] = 'N/A'
            }

          })

        }
        tempOrderedByDay[key][i] = tempOrderedByDay[key][i].filter(Boolean)
      }

    }
    this.orderedByDay = tempOrderedByDay;
    this.tableHeadings.push(arrOfHeadings);


  },
  props: ['rows', 'tableCols']
}
</script>

<style lang="css">
</style>
