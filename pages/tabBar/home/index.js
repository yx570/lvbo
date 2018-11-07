const app = getApp();
const productModel = require('../../../models/product/index.js');
const { img } = require('../../../config/url.js');
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
  onLoad() {
    console.log('1');
  },
  onShow() {
    console.log('2');
    app.pages.add(this);
    this.getList();
  },
  getList(request = productModel.query) {
    let _t = this;
    let params = {
      page_size: 6,
      is_set_home_page: 'yes'
    };
    this._getList({ request, params }, function (res) {
      res.list.forEach(v => {
        v.imgUrl = img + v.product_classical_home_page_image[0] || '';
      });
      var e = res.list.reverse();
      _t.setData({
        list: e,
        hasNextPage: res.hasNextPage
      });
    });
  },
  callme() {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    })
  },
  toCompanyDemo() {
    wx.navigateTo({
      url: '../../subs/about/index'
    })
  }
})
