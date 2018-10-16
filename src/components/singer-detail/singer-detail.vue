<template>
  <div class="singer-detail">

  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    console.log(this.singer);
  },
  data () {
    return {

    };
  },
  components: {

  }
};
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}
</style>
