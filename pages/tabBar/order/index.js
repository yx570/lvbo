//pages/Purchase/index.js
const authModel = require('../../../models/order/index.js');
const cartModel = require('../../../models/cart/index.js');
const app = getApp();
Page({ 
  ...app.loadcartlist,
  ...app.loadMoreMethods,
  data: {
    searchKeyword: '',  //需要搜索的字符
    searchSongList: [], //放置返回数据的数组,
    searchLoadingComplete: false , //“没有数据”的变量，默认false，隐藏

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
      request: authModel.goods,
      params: {
        key: this.data.searchKeyword || ''
      }
    }, function (res) {
      // console.log(list);
      _t.setData({
        searchSongList: res.list,
        searchLoadingComplete: !res.hasNextPage
      });
    });  
  },

  //详情
  urlshow: function (e) {
    wx.navigateTo({
      url: '../../purchase/details/details?id=' + e.currentTarget.dataset.id
    })
  },
  //加入购物车
  setTabBarBadge: function (e) {
    var id = e.currentTarget.dataset.id;
    var quantity =1;
    console.log(e.currentTarget.dataset.id)
    cartModel.additem({ id, quantity }).then(response => {
      console.log(response);
      this._cartlist(0, 1);
      wx.showToast({
        title: "添加成功",
        icon: "none",
        duration: 2000
      });
      // app.pages.get('pages/tabBar/cart/index').changeBadge(1);
    }).catch(error => {
      console.log('error!!!');
      console.log(error);
      wx.showToast({
        title: error.data.msg,
        icon: "none",
        duration: 2000
      });
    });
  },
  //load
  onLoad: function () {
    this.fetchSearchList();
  },
  onShow: function () {
    this._cartlist(0, 0);
  },
})


