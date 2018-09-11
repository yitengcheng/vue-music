<template>
  <div class="container">
    歌手页面
  </div>
</template>

<script type="text/ecmascript-6">
import { jsonpGet } from 'api/get';
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
          this.singers = res.data.list;
        }
      });
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
