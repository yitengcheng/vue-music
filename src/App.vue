<template>
  <el-container id="app">
    <el-header height='44px'>
      <m-header></m-header>
    </el-header>
    <el-main>
      <Tab></Tab>
      <transition :name="transitionName">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </el-main>
  </el-container>
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
.el-header {
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.el-main {
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
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
