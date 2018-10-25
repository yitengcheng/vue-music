<template>
  <div class="container">
    <div class="slider-wrapper">
      <el-carousel height="150px" indicator-position="none" arrow="always" ref="carousel">
        <el-carousel-item v-for="(item, index) in recommends" :key="index">
          <a :href="item.linkUrl">
            <img :src="item.picUrl" :alt="index" height="150" width="100%" class="bannder">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>
        <li v-for="(item,index) in discList" :key="index" class="item">
          <div class="icon">
            <img v-lazy="item.imgurl" width="60" height="60" />
          </div>
          <div class="text">
            <!-- v-html 用于转换数据中html符号 如:&nsp; -->
            <h2 class="name" v-html="item.creator.name"></h2>
            <p class="desc" v-html="item.dissname"></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Loading } from 'element-ui';
import { jsonpGet } from 'api/get';
export default {
  created () {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    _getRecommend () {
      let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
      let param = {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
      };
      jsonpGet(url, param).then((res) => {
        if (res.code === this.ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    _getDiscList () {
      const param = {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
      };
      this.get('getDiscList', param).then((res) => {
        if (res.code === this.ERR_OK) {
          this.discList = res.data.list;
          this.loading = false;
        }
      });
    }
  },
  data () {
    return {
      recommends: [],
      discList: [],
      loading: true
    };
  }
};
</script>

<style scoped lang="scss">
@import "~common/scss/variable";

.container {
  position: absolute;
  top: 90px;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.slider-wrapper {
  display: block;
}
.bannder {
  margin: 0 auto;
  justify-self: center;
  align-self: center;
}
.list-title {
  text-align: center;
  height: 65px;
  line-height: 65px;
  font-size: $font-size-medium;
  color: $color-theme;
}
.item {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  padding: 0 20px 20px 20px;
}
.icon {
  flex: 0 0 60px;
  width: 60px;
  padding-right: 20px;
}
.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  line-height: 20px;
  overflow: hidden;
  font-size: $font-size-medium;
}
.name {
  margin-bottom: 10px;
  color: $color-text;
}
.desc {
  color: $color-text-d;
}
</style>
