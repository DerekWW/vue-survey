/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Question from '@/components/Question';
import Day from '@/components/Day'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/filter-question',
      name: 'Question',
      component: Question
    },
    {
      path: '/by-day',
      name: 'Day',
      component: Day
    },

  ],
});
