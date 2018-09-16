const productModel = require('../../../models/product/index.js');
const app = getApp();
Page({ 
  ...app.loadMoreMethods,
  data: {
    //图片地址
    imgList: [
      '/static/images/demo/b1.jpg',
      '/static/images/demo/b2.jpg',
      '/static/images/demo/b3.jpg'
    ],

    mobile: "13800138000",

    list: [], //放置返回数据的数组

    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏
  },
  onLoad: function () {
    app.pages.add(this);
    this.getList(); 
  },
  getList(request = productModel.query) {
    let _t = this;
    let params = {};
    this._getList({ request, params }, function (res) {
      var e = res.list.reverse();
      _t.setData({
        list: e,
        hasNextPage: res.hasNextPage
      });
    });
  },
  callme: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    })
  }
})
