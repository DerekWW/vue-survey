<template>
<div id="app">
  <header>
    <navi :authenticated="authenticated" v-on:logout='logout'></navi>
  </header>
  <main>
    <div v-if="!authenticated" class="center logo">
      <div class="">
        <div>
          <img src="https://media.glassdoor.com/sqll/825775/galvanize-squarelogo-1429039425588.png" alt="">
        </div>
        <button v-on:click="authenticate" className="btn">Connect with Google</button>
        <div>
          Must use a email that has access to the sheet being viewed.
        </div>
      </div>
    </div>
    <router-view v-else :rows="rows" :orderedByDay="orderedByDay" :tableCols="tableCols"></router-view>
  </main>
  <footcomp></footcomp>
</div>
</template>

<script>
/* eslint-disable */
import { checkAuth, load } from './helpers/spreadsheet';
import navi from './components/partials/navi';
import footcomp from './components/partials/foot';
import _ from 'lodash';
import moment from 'moment';
import config from './helpers/config'

export default {
  name: 'app',
  components: {
    navi,
    footcomp

  },
  data() {
    return {
      authenticated: false,
      rows: [],
      students: { },
      tableCols: [],

      orderedByDay: [ ],
      dateObjArr: [ ],
      tableHeadings: { },
      myRows: '',

    }
  },

  beforeMount: function() {
    window.gapi.load('client', () => {
      checkAuth(true, this.handleAuth);
    });
  },


  methods: {
    updateData: function(){
      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: 'Form Responses 1!$A$1:$YY'
      }).then((response) => {
        return response.result.values || []  // eslint-disable
      }, (error) => {
        console.error(error)
        callback(false, error.result.error)
      }).then((data) => {
        this.rows = data.data;
      }).then(() => {
        this.organizeData()
      })
    },

    organizeData: function() {
      this.myRows = _.cloneDeep(this.rows);

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
        let headingIndexs = [];

        day.headings = [];
        day.totalSubmitted = 0;
        day.emotions = [
          [],
          [],
          [],
          []
        ]
        day.chartData = {
          labels: ['Great!', 'Good', 'Meh', 'Terrible'],
          datasets: [
            {
              label: 'Class Emotions',
              backgroundColor: [
                'rgba(24,255,0, 0.2)',
                'rgba(66, 232, 244, 0.2)',
                'rgba(241, 247, 66, 0.2)',
                'rgba(247, 72, 65, 0.2)'
              ],
              data: [0,0,0,0]
            }
          ]
        };

        day.students.forEach((student) => {
          day.totalSubmitted += 1;
          student.forEach((answer, index) => {

            if (answer != '' && headingIndexs.indexOf(index) === -1) {
              headingIndexs.push(index)
            }

            if (index === 2) {
              switch(answer) {
                case 'Great!':
                  day.chartData.datasets[0].data[0] += 1;
                  day.emotions[0].push(student[1])
                  break;
                case 'Good':
                  day.chartData.datasets[0].data[1] += 1;
                  day.emotions[1].push(student[1])
                  break;
                case 'Meh':
                  day.chartData.datasets[0].data[2] += 1;
                  day.emotions[2].push(student[1])
                  break;
                case 'Terrible':
                  day.chartData.datasets[0].data[3] += 1;
                  day.emotions[3].push(student[1])
                  break;
              }
            }

          })

          headingIndexs.sort((a,b) => {
            return a - b
          })

        })

        headingIndexs.forEach((el) => {
          day.headings.push(this.tableCols[el])
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
      console.log(this.orderedByDay);
    },

    handleAuth: function(authResult) {
      if (authResult && !authResult.error) {
        load(this.onLoad)
      } else {
          this.authenticated = false
      }
    },

    onLoad: function(data, error) {
      if (data) {
        this.tableCols = data.data.shift()

        let formatedData = data.data.forEach((rowArr) => {
          rowArr[0] = moment(rowArr[0], 'MM-DD-YYYY')
        })

        this.rows = data.data ;
        this.organizeData()
        this.authenticated = true;
      } else {
        this.error = error;
      }
    },

    authenticate: function(e) {
      e.preventDefault();
      checkAuth(false, this.handleAuth);
    },

    logout: function() {
     gapi.auth.signOut();
    },

    getCols: function() {
      this.tableCols = this.rows[0]
    }



  },

};
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}





.logo {
  margin-top: 15px;
}



</style>
