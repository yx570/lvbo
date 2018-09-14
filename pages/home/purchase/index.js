const authModel = require('../../../models/order/index.js');
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data: {
    currentRow: {},
    num: 0,
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏
    tabs: [
      {
        key: '0',
        label: '全部'
      },
      {
        key: '1',
        label: '待付款'
      },
      {
        key: '2',
        label: '待收货'
      },
      {
        key: '3',
        label: '已完成'
      }, 
      {
        key: '4',
        label: '已取消'
      }
    ],
    searchSongList: [],
    itemList:[]
  },
  onLoad: function (options) {
    this.setData({
      num: options.num
    })
    // app.pages.add(this);
    // this.getList(); 
  },
  onShow(){
    let request = [authModel.orderlist, authModel.orderlist,][this.data.currentTab - 1];
    this._initLoadMore();
    this.getList(request);
  },
  changeOil: function (e) {
    this.setData({
      num: e.target.dataset.num
    })
  },
   
  tabChange(ev) {
    this.setData({
      page: 1,
      rows: 20,
      num: ev.detail.key,
      hasNextPage: false,
      list: []
    });
    let request = [authModel.orderlist, authModel.orderlist,][this.data.currentTab - 1];
    this._initLoadMore();
    this.getList(request);
  }, 
  getList(request = authModel.orderlist) {
    let _t = this;
    let params = { scope: this.data.num };
    console.log(params)
    this.data.currentTab == 2 && (params.canVerify = true);
    this._getList({ request, params }, function (res) {
      console.log(res)
      _t.setData({
        searchSongList: res.list,
        hasNextPage: res.hasNextPage
      });
    });
  },
  // //评价
  // pj: function (e) {
  //   var num = e.currentTarget.dataset.num;
  //   wx.navigateTo({
  //     url: '../../work/purchase/evaluate/index?num=' + num
  //   })
  // },
  //物流
  wl: function (e) {
    // this.setData({
    //   currentRow: e.target.dataset.row
    // });
    console.log(e.target.dataset.row.id)
    wx.navigateTo({
      url: `../../work/purchase/logistics/index?orderId=` + e.target.dataset.row.id
    });
  
  },
  //支付
  zf: function (e) {
    var orderId = e.target.dataset.row[0].orderId;
    console.log(orderId)
    getApp().globalData.goSettleList1 = e.target.dataset.row;
    wx.navigateTo({
      url: '../../../pages/cart/fill/index?orderId=' + orderId +'&&type=3'
    })
  },
  //确认收货
  qrsh: function (e) {
    let  orderId  = e.target.dataset.id;
    console.log(orderId)
    authModel.receive({ orderId }).then(response => {
      console.log(response);
      wx.showToast({
        title: "已确认收货",
          icon: "none",
        duration: 2000
      });
      this.onShow();
    }).catch(error => {});
  },
  //取消
  qx: function (e) {
    let orderId = e.target.dataset.id;
    console.log(orderId)
    authModel.cancel({ orderId }).then(response => {
      console.log(response);
      wx.showToast({
        title: "已取消",
        icon: "none",
        duration: 2000
      });
      this.onShow();
    }).catch(error => { });
  },
  //删除
  delete: function (e) {
    var orderId  = e.target.dataset.id;
    console.log(orderId)
    authModel.delete({ orderId }).then(response => {
      console.log(response);
      wx.showToast({
        title: "已删除",
        icon: "none",
        duration: 2000
      });
      console.log(this.data.num)
      this.setData({
        page: 1,
        rows: 20,
        num: this.data.num,
        hasNextPage: false,
        list: []
      });
      this.onShow();
    }).catch(error => {});
  },
  //详情
  urlshow: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../../pages/work/details/index?orderId=' + e.currentTarget.dataset.id + '&&type=' +e.currentTarget.dataset.status
    })
  },
})