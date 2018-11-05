const QQMapWX = require('../../../plugins/qqmap-wx-jssdk.min.js');
let qqmapsdk;
Page({
  data: {
    searchResultDatas: [],
    pages: 1
  },
  onLoad() {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'KK2BZ-FWGWU-FODVF-242SA-AXYM6-NVB46'
    });

    this.getLocation();
  },
  getLocation() {
    let _that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        let lat = res.latitude
        let lng = res.longitude
        lat = 22.61797332763672
        lng = 114.037841796875
        // console.log(lat, lng);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: lat,
            longitude: lng
          },
          success: function (res) {
            let position = res.result.formatted_addresses.recommend
            let address = res.result.address;
            
            _that.setData({
              lat: lat,
              lng: lng,
              searchResultDatas: [{id: 1, title: position, address: address, isLocal: 1}]
            });
            _that.nearBy();
          }
        });
      }
    })
  },
  nearBy() {
    let _that = this;

    // 调用接口
    qqmapsdk.search({
      keyword: '小区',
      page_size: 20,
      page_index: _that.data.pages,
      location: {
        latitude: _that.data.lat,
        longitude: _that.data.lng
      },
      success: function (res) {
        _that.setData({
          searchResultDatas: [..._that.data.searchResultDatas, ...res.data],
          pages: _that.data.pages + 1
        });
      }
    })
  },
  _loadMore() {
    this.nearBy();
  }
})