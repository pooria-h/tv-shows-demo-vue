<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
import Names from '@/enums/Names';

export default {
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = `${Names.projectTitle} - ${to.meta.title}`;
      },
    },
  },
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

.app {
  padding: 30px;
}
</style>
