<template>
<div id="app">
  <navi :authenticated="authenticated" v-on:logout='logout'></navi>
  <div  v-if="!authenticated"  class="center">
    <div class="">
      <img src="./assets/logo.png">
      <button v-on:click="authenticate" className="btn">Connect with Google</button>
    </div>
  </div>
  <router-view v-else :rows="rows" :tableCols="tableCols"></router-view>
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
    }
  },
  mounted: function() {
    window.gapi.load('client', () => {
      checkAuth(true, this.handleAuth);
    });
  },
  methods: {

    handleAuth: function(authResult) {
      if (authResult && !authResult.error) {
        this.authenticated = true
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
