<template lang="html">
 <div class="row container">
   <div class="input-field col s12">
     <select>
       <option value="" disabled selected>Choose your student</option>
       <option value="1">Option 1</option>
     </select>
   </div>
 </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Student',
  data: function() {
    return {
      students: {},
      recent: this.orderedByDay.slice(0, 25)
    }
  },
  props: ['rows', 'orderedByDay'],
  beforeMount: function() {

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
