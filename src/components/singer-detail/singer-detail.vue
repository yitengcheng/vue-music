<template>
  <div class="singer-detail">

  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { jsonpGet } from 'api/get';
import { createSong } from 'common/js/song';

export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getSingerDetail();
  },
  methods: {
    _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer');
        return;
      }
      let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg';
      let param = {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 100,
        songstatus: 1,
        singermid: this.singer.id
      };
      jsonpGet(url, param).then((res) => {
        if (res.code === this.ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list);
        }
      });
    },
    _normalizeSongs (list) {
      let ret = [];
      list.forEach(item => {
        let { musicData } = item;
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  data () {
    return {
      songs: []
    };
  },
  components: {

  }
};
</script>

<style scoped lang="scss">
@import "~common/scss/variable";
.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}
</style>
