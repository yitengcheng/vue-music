<template>
  <Scroll class="listview" :data="data">
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-group">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item,key) in group.items" :key="key" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </Scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll';
export default {
  props: {
    data: {
      type: Array,
      default: () => { return []; }
    }
  },
  components: { Scroll }
};
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
}
.list-group {
  padding-bottom: 30px;
}
.list-group-title {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: $font-size-small;
  color: $color-text-l;
  background-color: $color-hightlight-background;
}
.list-group-item {
  display: flex;
  align-items: center;
  padding: 20px 0 0 30px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.name {
  margin-left: 20px;
  color: $color-text-l;
  font-size: $font-size-medium;
}
</style>
