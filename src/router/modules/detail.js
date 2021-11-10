import Routes from '@/enums/Routes';
import Names from '@/enums/Names';
import Detail from '@/views/Detail.vue';

export default {
  path: Routes.detail,
  name: Names.detail,
  component: Detail,
  meta: {
    title: Names.detail.charAt(0).toUpperCase() + Names.detail.slice(1),
  },
};
