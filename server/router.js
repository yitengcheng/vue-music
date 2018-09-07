const base_server = '/api/';

module.exports = {
  routers: [
    { router: base_server + 'getDiscList', serverUrl: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' }
  ]
}
