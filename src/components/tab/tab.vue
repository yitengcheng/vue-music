<template>
  <el-menu mode="horizontal" :default-active="$route.path" router class="el-menu" active-text-color="#ffcd32" background-color="#222">
    <el-menu-item class="el-menu-item" index="/recommend">推荐</el-menu-item>
    <el-menu-item class="el-menu-item" index="/singer">歌手</el-menu-item>
    <el-menu-item class="el-menu-item" index="/rank">排行</el-menu-item>
    <el-menu-item class="el-menu-item" index="/search">搜索</el-menu-item>
  </el-menu>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      activeIndex: '1'
    };
  },
};
</script>

<style scoped lang="scss">
@import "~common/scss/variable";

.el-menu {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
}
.el-menu-item {
  flex: 1;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: $color-text-l;
}
</style>
