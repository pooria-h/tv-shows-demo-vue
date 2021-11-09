<template>
  <div class="skeletonLoader" :style="styles"></div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '50px',
    },
  },
  computed: {
    styles() {
      return `width: ${this.width}; height: ${this.height};`;
    },
  },
};
</script>

<style lang="scss" scoped>
.skeletonLoader {
  display: inline-block;
  height: 1em;
  position: relative;
  overflow: hidden;
  background-color: $gray-3;
  border-radius: 10px;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
            90deg,
            rgba(#fff, 0) 0,
            rgba(#fff, 0.2) 20%,
            rgba(#fff, 0.5) 60%,
            rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
