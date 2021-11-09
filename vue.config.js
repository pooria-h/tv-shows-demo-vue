module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/tv-shows-demo-vue/' : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `
        @import "~@/assets/scss/preload/variables.scss";
        @import "~@/assets/scss/preload/mixins.scss";`,
      },
    },
  },
};
