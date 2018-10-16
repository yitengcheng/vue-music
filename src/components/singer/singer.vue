<template>
  <div class="container">
    <list-view :data="singers" @select="selectSinger"></list-view>
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import { jsonpGet } from 'api/get';
import Singer from 'common/js/singer';
import ListView from 'base/listview/listview';
import { mapMutations } from 'vuex';

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;

export default {
  created () {
    this._getSingers();
  },
  data () {
    return {
      singers: [],
      transitionName: 'slide-left'
    };
  },
  components: {
    ListView
  },
  mounted () {
    console.log(this.singers);
  },
  methods: {
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingers () {
      let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
      let param = {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
      };
      jsonpGet(url, param).then((res) => {
        if (res.code === this.ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
        }
      });
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }));
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }));
      });
      // 为了得到有序列表，我们需要处理 map
      let ret = [];
      let hot = [];
      this._.map(map, (value, index) => {
        let val = map[index];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      });
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
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

<style scoped lang="scss">
.container {
  position: relative;
  top: 5px;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
