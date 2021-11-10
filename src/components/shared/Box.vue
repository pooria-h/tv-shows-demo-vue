<template>
<div class="box" :class="{ 'box--noPadding': noPadding }" :style="styles">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    margin: {
      type: String,
      default: '0',
    },
    noPadding: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return `margin: ${this.margin};`;
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px;
  border-radius: 10px;
  background-color: $white;
}
.box--noPadding {
  padding: 0 !important;
}
</style>
