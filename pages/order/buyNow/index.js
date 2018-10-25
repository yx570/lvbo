const cartModel = require('../../../models/cart/index.js');
const app = getApp();
Page({
  // ...app.loadcartlist,
  data: {
    name: "刘德华",
    tel: "3800138000",
    address: "广东省深圳市福田区益田路6009号广东省深圳市福田区益田路6009号",
    totalPrices: 2879
  },

  // 详情加载
  onLoad: function (ev) {
    app.setNavColor()
  },
  onShow() {
    this.getList();
  },
  // 获取列表
  getList: function () {
    cartModel.cartlist().then(response => {
      let { list = [] } = response.data;
      list = [list[0], list[1]];
      this.setData({
        orders: list,
        selectQuantity: 0
      });
      var e = list.length;
      this.changeBadge(e);
      this.checkShow();
      this.computeTotalPrice();
    }).catch(error => { });
  },
  //详情
  urlshow(e) {
    // console.log(e.currentTarget.dataset.id)
    // url: '../../purchase/details/details?id=' + e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../product/details/index?id=' + e.currentTarget.dataset.id
    })
  },
  //选择时间
  selectTap(e) {
    wx.navigateTo({
      url: '../../order/editDates/index?id=' + e.currentTarget.dataset.id + '&mutli=1'
    })
  },
  goSettle() {
    wx.showToast({
      title: "调用微信支付",
      icon: 'none',
      duration: 2000
    });
  }
})


