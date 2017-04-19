<template lang="html">
  <div class="row">
    <div class="input-field col s12">
      <form>
        <select>
          <option value="" disabled selected>Select Student</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </form>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  name: 'Question',
  created: function() {
    $(document).ready(function() {
      $('select').material_select()
    });
  },
  props: ['rows', 'tableCols']
}
</script>

<style lang="css">
</style>
