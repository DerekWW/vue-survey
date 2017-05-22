<template lang="html">
  <div class="container">
    <div class="row" v-for="day in today">
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
export default {
  name: 'Today',
  data: function(){
    return {
      today: [this.orderedByDay[0]]
    }
  },

  created: function() {
    $(document).ready(function() {
      $('select').material_select()
    });
  },
  props: ['rows', 'tableCols', 'orderedByDay']
}
</script>

<style lang="css">
</style>
