<template>
  <div class="container">
    <div class="slider-wrapper">
      <el-carousel height="150px" indicator-position="none" arrow="always">
        <el-carousel-item v-for="(item, index) in recommends" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" :alt="index" height="150px" width="100%">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul></ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getRecommend } from 'api/recommend';
import { ERR_OK } from 'api/config';
export default {
  created () {
    this._getRecommend();
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    }
  },
  data () {
    return {
      recommends: []
    };
  },
  components: {

  }
};
</script>

<style scoped lang="scss">
@import "~common/scss/variable";

.container {
  position: absolute;
  top: 90px;
  width: 100%;
  overflow: hidden;
}
.slider-wrapper {
  display: block;
}
.list-title {
  text-align: center;
  height: 65px;
  line-height: 65px;
  font-size: $font-size-medium;
  color: $color-theme;
}
</style>
