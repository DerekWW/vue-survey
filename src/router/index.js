/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Today from '@/components/Today';
import Day from '@/components/Day';
import Recent from '@/components/Recent';
import Student from '@/components/Student';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/today',
      name: 'Today',
      component: Today
    },
    {
      path: '/by-day',
      name: 'Day',
      component: Day
    },
    {
      path: '/recent',
      name: 'Recent',
      component: Recent
    },
    {
      path: '/by-student',
      name: 'Student',
      component: Student
    }

  ],
});
