const cartModel = require('../../../models/cart/index.js');
const app = getApp();
Page({
  // ...app.loadcartlist,
  data: {
    orders: [],
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
    let list = app.globalData.goSettleList;
    this.setData({
      orders: list
    });
    var e = list.length;
    this.computeTotalPrice();
  },
  inputTap() { },
  // 改变商品数量
  changeCount(e) {
    let self = this;
    let { value } = e.detail;
    let { id, index, skuname } = e.currentTarget.dataset;
    // console.log(value);
    this.setData({
      [`orders[${index}].quantity`]: value,
      [`orders[${index}].checked`]: this.data.orders[index].checked ? Boolean(value) : false
    });
    this.computeTotalPrice();
  },
  // 计算总价
  computeTotalPrice() {
    // console.log(this.data.orders);
    let total = 0;
    this.data.orders.forEach((v, i) => {
      v.checked && (total += v.defaultCombo.sku_price * v.quantity);
    });
    this.setData({
      totalPrices: total.toFixed(2)
    });
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


