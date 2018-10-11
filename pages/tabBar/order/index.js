const orderModel = require('../../../models/order/index.js');
const app = getApp();
Page({ 
  ...app.loadcartlist,
  ...app.loadMoreMethods,
  data: {
    tabs: [
      {
        key: 0,
        label: '全部'
      }, 
      {
        key: 1,
        label: '待付款'
      },
      {
        key: 2,
        label: '已付款'
      },
      {
        key: 3,
        label: '已完成'
      }
    ],
    list: [], 
    hasNextPage: false,
    statusFormat: {
      1: "已完成",
      2: "待付款",
      3: "已付款",
    }
  },
  getList () {
    let _t = this;
    this._getList({
      request: orderModel.goods
    }, function (res) {
      _t.setData({
        list: res.list,
        hasNextPage: !res.hasNextPage
      });
    });  
  },

  //加入购物车
  setTabBarBadge (e) {
    var id = e.currentTarget.dataset.id;
    var quantity =1;
    cartModel.additem({ id, quantity }).then(response => {
      this._cartlist(0, 1);
      wx.showToast({
        title: "添加成功",
        icon: "none",
        duration: 2000
      });
    }).catch(error => {
      wx.showToast({
        title: error.data.msg,
        icon: "none",
        duration: 2000
      });
    });
  },
  //load
  onLoad (e) {
    console.log(e)
    this.getList();
  },
  onShow () {
    // this._cartlist(0, 0);
  },
})


