import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Routes from '@/enums/Routes';
import Names from '@/enums/Names';

Vue.use(VueRouter);

const routes = [
  {
    path: Routes.home,
    name: Names.home,
    component: Home,
    meta: {
      title: Names.home.charAt(0).toUpperCase() + Names.home.slice(1),
    },
  },
  {
    path: Routes.detail,
    name: Names.detail,
    component: () => import('../views/Detail.vue'),
    meta: {
      title: Names.detail.charAt(0).toUpperCase() + Names.detail.slice(1),
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
