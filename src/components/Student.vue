<template lang="html">
 <div class="row container">
   <div class="input-field col s12">
     <select class="browser-default" v-model="selectedStudent">
       <option value="" disabled selected>Choose your student</option>
       <option v-for="studentname in studentNameList" v-bind:value="studentname">{{studentname}}</option>

     </select>
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
      currentStudent: null
    }
  },
  props: ['rows', 'orderedByDay'],
  beforeMount: function() {
    this.recent.forEach((day) => {

      day.students.forEach((student) => {

        if (!this.students[student[1]]) {
          this.students[student[1]] = []
          this.studentNameList.push(student[1])
        }



      })

    })
  },
  created: function() {
    $(document).ready(function() {
      $('select').material_select();
  });

  }
}
</script>

<style lang="css">
</style>
