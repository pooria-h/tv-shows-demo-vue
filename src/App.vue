<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";

.app {
  padding: 30px;
}
</style>
