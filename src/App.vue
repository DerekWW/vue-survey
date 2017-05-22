<template>
<div id="app">
  <navi :authenticated="authenticated" v-on:logout='logout'></navi>
  <div  v-if="!authenticated"  class="center">
    <div class="">
      <img src="./assets/logo.png">
      <button v-on:click="authenticate" className="btn">Connect with Google</button>
    </div>
  </div>
  <router-view v-else :rows="rows" :orderedByDay="orderedByDay" :tableCols="tableCols"></router-view>
  <foot></foot>
</div>
</template>

<script>
/* eslint-disable */
import { checkAuth, load } from './helpers/spreadsheet';
import navi from './components/partials/navi';
import foot from './components/partials/foot';
import _ from 'lodash';
import moment from 'moment';

export default {
  name: 'app',
  components: {
    navi,
    foot

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
    organizeData: function() {
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

body {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
main {
  flex: 1 0 auto;
}




</style>
