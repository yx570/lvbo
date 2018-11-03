
const test = require('utils/test.js')
const pages = require('plugins/pages.js')
const cartModel = require('models/cart/index.js');
App({
  globalData: {
    currentOrderTab: '0',
    orderId: [],
    catList: [],//是否在购物车
    goSettleList: [],//购物车
    goSettleList1: [],//去支付
    selectRow: {}, //收货地址
    selectRowType: 0,
    bankCard: 0,
  },
  onLaunch: function () {
    this.test = test;
    this.pages = pages;
    this.getUserSetting();
    // this.getUserLocation();
    if (!wx.getStorageSync("token")) {
      this.userLogin();
    }
  },
  userLogin() {
    wx.login({
      success(res) {
        if (res.code) {

          //发起网络请求
          wx.request({
            url: 'https://www.newborni.com/Api/Common/login',
            method: "post",
            data: {
              code: res.code
            },
            success(res) {
              wx.setStorageSync("token", res.data.dataList.token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  getUserSetting() {
    wx.getSetting({
      success: (res) => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
          // wx.getUserInfo({
          //   success: function (res) {
          //     var userInfo = res.userInfo
          //     var nickName = userInfo.nickName
          //     var avatarUrl = userInfo.avatarUrl
          //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
          //     var province = userInfo.province
          //     var city = userInfo.city
          //     var country = userInfo.country
          //   }
          // })
        }
      }
    })
  },
  setNavTitle(title) {
    wx.setNavigationBarTitle({ title })
  },
  setNavColor(obj = {
    frontColor: '#ffffff',
    backgroundColor: '#00b0ab',
    animation: {
      duration: 10,
      timingFunc: 'easeIn'
    }
  }) {
    wx.setNavigationBarColor(obj)
  },
  alert(content) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: obj.title || '温馨提示',
        content: obj.content || '',
        showCancel: false,
        confirmColor: obj.confirmColor || '#00b0ab',
        success: res => {
          resolve(res)
        },
        fail: error => {
          reject(error)
        }
      })
    })
  },
  confirm(obj = {}) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: obj.title || '温馨提示',
        content: obj.content || '',
        showCancel: obj.showCancel || true,
        cancelText: obj.cancelText || '取消',
        confirmText: obj.confirmText || '确认',
        confirmColor: obj.confirmColor || '#00b0ab',
        success: res => {
          if (res.confirm) {
            resolve(res)
          } else {
            reject(res)
          }
        },
        fail: error => {
          reject(error)
        }
      })
    })
  },
  toastSuccess(title) {
    wx.showToast({
      title,
      icon: 'success',
      duration: 2000
    })
  },
  toastError(title) {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000
    })
  },
  makePhoneCall(phoneNumber) {
    wx.makePhoneCall({ phoneNumber });
  },
  // 获取地理位置
  getUserLocation() {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
      }
    })
  },
  //获取购物车商品件数
  loadcartlist: {
    _cartlist(selectQuantity, count) {
      cartModel.cartlist().then(response => {
        var arr = [];
        response.data.list.forEach(v => {
          arr.push(v.id);
        });
        getApp().globalData.catList = arr;

        var selectQuantity = 0;
        var e = response.data.list.length;
        this._changeBadge(selectQuantity, e)
      }).catch(error => { });
    },
    _changeBadge(selectQuantity, count) {
      var e = selectQuantity + count
      if (count != 0) {
        // 总数
        wx.setTabBarBadge({
          index: 2,
          text: String(e)
        });
      }
    },
  },
  //分页
  loadMoreMethods: {
    _data: {
      page: 1,
      rows: 10,
      list: [],
      hasNextPage: false,
      request: null,
      callback: null,
      params: null
    },
    _initLoadMore(params = {}) {
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
    }, callback = function () { }) {
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
        //let { page, totalPages, list = [] } = response.dataList || {};
        let totalRows = response.dataList.total;
        let page = params.page;
        let totalPages = Math.ceil(totalRows / params.rows);
        let list = response.dataList.productList || [];
        this._data.hasNextPage = totalPages > page ? true : false;
        this._data.list = [...this._data.list, ...list];
        typeof callback == 'function' && callback({
          list: this._data.list,
          hasNextPage: this._data.hasNextPage
        });
      }).catch(e => { });
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