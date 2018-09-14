 
const test = require('utils/test.js')
const pages = require('plugins/pages.js')
const cartModel = require('models/cart/index.js');
App({
  globalData: {
    orderId: [],
    catList: [],//是否在购物车
    goSettleList: [],//购物车
    goSettleList1: [],//去支付
    selectRow:{}, //收货地址
    selectRowType: 0,
    bankCard: 0,
  },
  onLaunch: function () {
    this.test = test;
    this.pages = pages;
    this.getUserSetting();
    //this.getUserLocation();
  },
  getUserSetting(){
    wx.getSetting({
      success: (res) => {
        console.log(res)
      }
    })
  },
  // 获取地理位置
//getUserLocation(){
//  wx.getLocation({
//    type: 'wgs84',
//    success: function(res) {
//      // console.log(res);
//    }
//  })
//},
  //获取购物车商品件数
  loadcartlist:{
    _cartlist(selectQuantity, count) {
      cartModel.cartlist().then(response => {
        var arr = [];
        response.data.list.forEach(v => {
          arr.push(v.skuId);
        });
        getApp().globalData.catList = arr;

        var selectQuantity = 0;
        var e = response.data.list.length;
        this._changeBadge(selectQuantity,e)
      }).catch(error => { });
    },
    _changeBadge(selectQuantity, count) {
      var e = selectQuantity + count
      if (count != 0){
        // 总数
        wx.setTabBarBadge({
          index: 2,
          text: String(e)
        });
      }
    },
  },
  //分页
  loadMoreMethods:{
    _data:{
        page: 1,
        rows: 10,
        list: [],
        hasNextPage: false,
        request: null,
        callback: null,
        params:null
    },
    _initLoadMore(params = {}){
      let { 
        page = 1, 
        rows = 10, 
        list = [], 
        hasNextPage = false 
      } = params;
      this._data.page = page;
      this._data.rows = rows;
      this._data.list = list;
      this._data.hasNextPage = hasNextPage;
    },
    _getList({
      request,
      params
    },callback = function(){}){
      let { page, rows } = this._data;
      let _params = {
        page,
        rows
      };
      params && (_params = Object.assign({}, _params, params));
      this._data.request = request;
      this._data.params = params;
      this._data.callback = callback;
      request(_params).then(response => {
        let { page, totalPages, list = [] } = response.data || {};
        this._data.hasNextPage = totalPages > page ? true : false;
        this._data.list = [...this._data.list, ...list];
        typeof callback == 'function' && callback({
          list: this._data.list,
          hasNextPage: this._data.hasNextPage
        });
      }).catch(e => {});
    },
    _loadMore() {
      if (this._data.hasNextPage) {
        this._data.page += 1;
        this._getList({
          request: this._data.request,
          params: this._data.params
        }, this._data.callback);
      }
    }
  }
})