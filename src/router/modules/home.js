import Routes from '@/enums/Routes';
import Names from '@/enums/Names';
import Home from '@/views/Home.vue';

export default {
  path: Routes.home,
  name: Names.home,
  component: Home,
  meta: {
    title: Names.home.charAt(0).toUpperCase() + Names.home.slice(1),
  },
};
