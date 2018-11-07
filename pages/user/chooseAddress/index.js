const QQMapWX = require('../../../plugins/qqmap-wx-jssdk.min.js');
let qqmapsdk;
Page({
  data: {
    searchResultDatas: [],
    pages: 1,
    searchResult: '',
    hasNextPage: 1,
    showClear: 0
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
              searchResultDatas: [{ id: 1, title: position, address: address, isLocal: 1 }]
            });
            _that.nearBy();
          }
        });
      }
    })
  },
  nearBy() {
    let _that = this;
    let opts = {
      keyword: _that.data.searchResult || "小区",
      page_size: 20,
      page_index: _that.data.pages,
      location: {
        latitude: _that.data.lat,
        longitude: _that.data.lng
      },
      success: function (res) {
        if (res.data.length > 0) {
          _that.setData({
            searchResultDatas: [..._that.data.searchResultDatas, ...res.data],
            pages: _that.data.pages + 1
          });
        } else {
          _that.setData({
            hasNextPage: 0
          });
        }
      }
    }

    // 调用接口
    if (_that.data.hasNextPage) {
      qqmapsdk.search(opts)
    } else {
      app.toastError('没有更多了');
    }
  },
  _loadMore() {
    this.nearBy();
  },
  changeInputValue(ev) {
    var that = this;
    let value = ev.detail.value;
    if (value) {
      this.setData({
        pages: 1,
        hasNextPage: 1,
        searchResult: value,
        searchResultDatas: []
      });
    } else {
      this.setData({
        showClear: 0
      });
    }
    this.nearBy();
  },
  showClear() {
    this.setData({
      showClear: 1
    });
  },
  clearSearch() {
    this.setData({
      showClear: 0,
      searchResult: ''
    });
    this.getLocation();
  },
  selectAddress(ev) {
    let { id } = ev.currentTarget.dataset;
    let address = '';
    let lat = '';
    let lng = '';
    this.data.searchResultDatas.forEach(v => {
      if (v.id == id) {
        address = v.title;
        lat = v.location.lat;
        lng = v.location.lng;
      }
    });
    wx.navigateTo({
      url: '../address/index?address=' + address + '&lat=' + lat + '&lng=' + lng
    })
  }
})