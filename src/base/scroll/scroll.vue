<template>
  <div ref="wrapper">
    <slot></slot>
    <!-- slot插槽,用法便为外部调用该组件,可以传入子组件 -->
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      });
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos);
        });
      }
    },
    enable () {
      this.scroll && this.scroll.enable();
    },
    disable () {
      this.scroll && this.scroll.disable();
    },
    refresh () {
      this.scroll && this.scroll.refresh();
    },
    scorllTo () {
      this.scroll && this.scroll.apply(this.scroll, arguments);
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh();
      }, 20);
    }
  }
};
</script>

<style scoped lang="scss">
</style>
