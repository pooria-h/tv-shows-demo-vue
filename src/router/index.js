import Vue from 'vue';
import VueRouter from 'vue-router';
import errors from './modules/errors';
import home from './modules/home';
import detail from './modules/detail';

Vue.use(VueRouter);

const routes = [
  ...errors,
  home,
  detail,
  { path: '*', redirect: '/404' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
