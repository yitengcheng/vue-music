<template>
  <div id="app">
    <m-header></m-header>
    <Tab></Tab>
    <transition :name="transitionName">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header';
import Tab from 'components/tab/tab';
export default {
  components: { MHeader, Tab },
  data () {
    return {
      transitionName: 'slide-left'
    };
  },
  watch: {
    '$route' (to, from) { // 使用watch 监听$router的变化
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
};
</script>

<style lang="scss">
#app {
  position: relative;
  height: 100%;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s;
}
.slide-left-enter,
.slide-left-to {
  transform: translate3d(100%, 0, 0);
}
.slide-right-enter,
.slide-right-to {
  transform: translate3d(-100%, 0, 0);
}
</style>
