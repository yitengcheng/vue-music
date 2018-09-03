<template>
  <div id="app">
    hello world
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    show: true
  })
};
</script>

<style lang="scss">
@import "~common/scss/variable";
#app {
  color: $color-theme;
}
</style>
