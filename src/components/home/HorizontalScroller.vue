<template>
<div class="horizontalScroller">
  <button
      @click="scrollBy(-windowInstance.innerWidth + staticScrollOffset)"
      class="navButton navButton--back"
      type="button">
    <ion-icon name="chevron-back-outline" size="large"></ion-icon>
  </button>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
  <button
      @click="scrollBy(windowInstance.innerWidth - staticScrollOffset)"
      class="navButton navButton--forward"
      type="button">
    <ion-icon name="chevron-forward-outline" size="large"></ion-icon>
  </button>
</div>
</template>

<script>
export default {
  name: 'HorizontalScroller',
  methods: {
    scrollBy(pixels) {
      this.$refs.wrapper.scrollBy({ left: pixels, behavior: 'smooth' });
    },
  },
  mounted() {
    this.windowInstance = window;
  },
  data() {
    return {
      // It's about half size of a single element inside wrapper
      staticScrollOffset: 150,
      windowInstance: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.horizontalScroller {
  position: relative;
}
.wrapper {
  display: flex;
  width: 100%;
  min-height: 100px;
  margin: 10px auto;
  overflow-y: hidden;
  overflow-x: auto;
}
.navButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  background-color: $white;
  border-radius: 50px;
  padding: 10px;
  z-index: 2;
  box-shadow: $boxShadow-default;
}
.navButton--back {
  left: 15px;
}
.navButton--forward {
  right: 15px;
}
</style>
