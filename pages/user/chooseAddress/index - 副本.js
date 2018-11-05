const bmap = require('../../../plugins/bmap-wx.min.js');
let BMap;
Page({
  data: {
  },
  onLoad() {
    // 实例化API核心类
    BMap = new bmap.BMapWX({
        ak: 'IKD3G840R66N9WO87RBwUgA7S1lfDKMn'
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
        BMap.regeocoding({
          location: lat + ',' + lng,
          success: function (res) { 
            _that.setData({
              // address: res.originalData.result.formatted_address + res.originalData.result.sematic_description
              address: lat + ',' + lng
            })
            console.log(res);
          },
          fail: function () {
            wx.showToast({
              title: '请检查位置服务是否开启',
            })
           },
        })

        // console.log(lat, lng);
        // qqmapsdk.reverseGeocoder({
        //   location: {
        //     latitude: lat,
        //     longitude: lng
        //   },
        //   success: function (res) {
        //     let position = res.result.address_component.nation + res.result.address_component.province + res.result.address_component.city + res.result.formatted_addresses.recommend
        //     _that.setData({
        //       address: position
        //     })
        //   }
        // });
      }
    })
  },
  onShow() {
    // 调用接口
    // let myKeys = ['小区', '大厦', '街道', '学校']
    // let local = new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}}); 
    // local.searchInBounds(myKeys ,bounds); 

    // qqmapsdk.search({
    //   keyword: '小区',
    //   success: function (res) {
    //     console.log(res);
    //   }
    // })
    // qqmapsdk.search({
    //   keyword: '街道',
    //   success: function (res) {
    //     console.log(res);
    //   }
    // })
    // qqmapsdk.search({
    //   keyword: '大厦',
    //   success: function (res) {
    //     console.log(res);
    //   }
    // })
  }
})