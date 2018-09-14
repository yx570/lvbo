
Page({
  data:{
    type:0,
    err:''
  },
  onLoad: function (ev) {
    console.log(ev)
    this.setData({
      type: ev.type,
      totalPrices: ev.totalPrices,
      orderId: ev.orderId,
      err: ev.err
    })
  },
  //返回首页
   gosy() {
    wx.switchTab({
      url: '../../../../pages/tabBar/home/index'
    });
  },
  //查看订单
  godd(e) {
    let orderId = this.data.orderId
    wx.redirectTo({
      url: '../../../../pages/work/details/index?orderId=' + orderId +'&&type=0'
    })
   },
   //重新支付
  rebuild(e) {
    let orderId = getApp().globalData.orderId;
    wx.redirectTo({
      url: '../../../../pages/cart/fill/index?orderId=' + orderId + '&&type=3'
    })
  },
})