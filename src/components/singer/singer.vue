<template>
  <div class="container">
    <list-view :data="singers"></list-view>
  </div>
</template>

<script type="text/ecmascript-6">
import { jsonpGet } from 'api/get';
import Singer from 'common/js/singer';
import ListView from 'base/listview/listview';

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 10;

export default {
  created () {
    this._getSingers();
  },
  data () {
    return {
      singers: []
    };
  },
  components: {
    ListView
  },
  mounted () {
    console.log(this.singers);
  },
  methods: {
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
</style>
