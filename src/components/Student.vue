<template lang="html">
  <div class="container">
    <div class="row">
      <div class="input-field col s12">
        <select v-on:change="onChange" class="browser-default" v-model="selectedStudent">
          <option value="" disabled selected>Choose your student</option>
          <option v-for="studentname in studentNameList" v-bind:value="studentname">{{studentname}}</option>
        </select>
      </div>
    </div>
    <div v-if="currentStudentArr" class="row" v-for="day in currentStudentArr">
      <div class="col s12">
        <h4 class="center">{{ day.date.format("dddd, MMMM Do YYYY") }}</h4>
        <table class="striped bordered">
          <thead>
            <tr>
              <th v-for=" heading in day.headings">{{ heading }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="row in day.answers">{{ row }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import _ from 'lodash';

export default {
  name: 'Student',
  data: function() {
    return {
      students: {},
      recent: this.orderedByDay.slice(0, 25),
      selectedStudent: '',
      studentNameList: [],
      currentStudentArr: null
    }
  },
  props: ['rows', 'orderedByDay'],
  beforeMount: function() {
    this.recent.forEach((day) => {

      day.students.forEach((student) => {
        let newStudentObj = {};

        if (!this.students[student[1]]) {
          this.students[student[1]] = []
          this.studentNameList.push(student[1])
        }

        newStudentObj.headings = day.headings;
        newStudentObj.answers = student;
        newStudentObj.date = day.date;

        this.students[student[1]].push(newStudentObj)






      })

    })
  },
  created: function() {
    $(document).ready(function() {
      $('select').material_select();
    })
  },
  methods: {
    onChange: function(event) {
      console.log('working');
      this.currentStudentArr = this.students[this.selectedStudent]
    }
  },

}

</script>

<style lang="css">
</style>
