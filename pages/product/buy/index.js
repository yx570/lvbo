const orderModel = require('../../../models/order/index.js');
const payModel = require('../../../models/pay/index.js');
Page({
  data: {
    Freight: '0.00',//运费
    listV:[],
    checkedAll: true,
    totalPrices: 0,
    orderId:'',
    type:0
  },
  onLoad: function (ev) {
    console.log(ev)
    this.setData({
      orderId: ev.orderId,
      type: ev.type
    })
    let orderId = this.data.orderId; 
    orderModel.view({ orderId }).then(response => {
      this.setData({
        listV: response.data,
      })
    }).catch(e => { });
  },
  rebuild() {
    let orderId = this.data.orderId;
    console.log(orderId)
    wx.redirectTo({
      url: '../../../pages/cart/fill/index?payType=2&&orderId=' + orderId + '&&type=1'
    })
  },
   zf(e) {
     var orderId = this.data.listV.items[0].orderId;
     getApp().globalData.goSettleList1 = this.data.listV.items;
     wx.redirectTo({
        url: '../../../pages/cart/fill/index?orderId=' + orderId + '&&type=3' 
      })
  },

  shoho() {
    wx.redirectTo({
      url: '../../../pages/purchase/service/index'
    })
  },
  //取消
  qx: function (e) {
    let orderId = e.target.dataset.id;
    console.log(orderId)
    orderModel.cancel({ orderId }).then(response => {
      console.log(response);
      wx.navigateBack();
      wx.showToast({
        title: "已取消",
        icon: "none",
        duration: 2000
      });
    }).catch(error => { });
  },

})