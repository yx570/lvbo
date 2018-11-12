const app = getApp();
const productModel = require('../../../models/product/index.js');
const commonModel = require('../../../models/common/index.js');
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
    let _that = this;
    app.pages.add(this);
    this.getImgList();
    this.getList();

    // 判断有没有token,有token即有本地用户信息，读取本地用户信息到globalData
    if (wx.getStorageSync("token")) {
      // 读取本地用户信息
      app.globalData.userInfo = wx.getStorageSync("userInfo");
    } else {
      // 调用登录接口
      app.userLogin(function () {
        _that.showAuth();
      });
    }
  },
  showAuth() {
    this.setData({
      popVisible: true
    });
    wx.hideTabBar({});
  },
  hideAuth() {
    this.setData({
      popVisible: false
    });
    wx.showTabBar({})
  },
  bindGetUserInfo(ev) {
    if (ev.detail.userInfo) {
      app.globalData.userInfo.user_wx_nick_name = ev.detail.userInfo.nickName;
      app.globalData.userInfo.user_wx_avatar_url = ev.detail.userInfo.avatarUrl;                // 用户微信头像地址
      app.globalData.userInfo.user_locate_province = ev.detail.userInfo.province;            // 微信 省
      app.globalData.userInfo.user_locate_city = ev.detail.userInfo.city;                    // 微信 市
      app.globalData.userInfo.user_locate_district = '';
      app.saveUserInfo();
    }
    this.hideAuth();
  },
  getImgList() {
    commonModel.getSwipe({}).then(res => {
      console.log(res)
    });
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
  getPhone() {

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
