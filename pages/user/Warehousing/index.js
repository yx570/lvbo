const orderModel = require('../../../models/order/index.js');
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data:{
    orders:[],
    item: [],
    skuId:[],
    selected: "",
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
    searchKeyword: '',  //需要搜索的字符
  },
  onLoad: function () {
    this.fetchSearchList();
  },
 
  // 改变商品数量
  changeCount(e) {
    let self = this;
    let stock = e.detail.value;
    let skuId = e.currentTarget.dataset.goodsid;
    console.log(skuId)
    console.log(stock);
    //更改数量
    orderModel.modify({ skuId, stock }).then(response => { 
      wx.showToast({
        title: "修改成功",
        icon: 'none',
        duration: 2000
      });
    }).catch(e => { });
  },

  //输入框事件，每输入一个字符，就会触发一次
  bindKeywordInput: function (e) {
    this.setData({
      searchKeyword: e.detail.value
    })
    this._initLoadMore();
    this.fetchSearchList();
  },
  //搜索
  fetchSearchList: function () {
    let _t = this;
    this._getList({
      request: orderModel.stockall,
      params: {
        key: this.data.searchKeyword || ''
      }
    }, function (res) {
      _t.setData({
        orders: res.list,
        searchLoadingComplete: !res.hasNextPage
      });
    });
  },
 

  //详情
  urlshow: function (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../purchase/details/details?id=' + e.currentTarget.dataset.id
    })
  },
})