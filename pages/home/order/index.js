  // pages/work/order/index.js
const orderModel = require('../../../models/order/index.js');
const app = getApp();
Page({ 
  ...app.loadMoreMethods,
  data: {
    tab: 0, 
    tabs: [
      {
        key: 0,
        label: '订单列表'
      },
      {
        key: 1,
        label: '待处理订单'
      },
      {
        key: 2,
        label: '已完成订单'
      }
    ],
    type:'',
    list: [], //放置返回数据的数组
    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏
  },
  orderdetailsurl: function (e) {
    let { address, type, id, key} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../../work/order/details/index?key=' + key + '&id=' + id + '&type=' + type + '&address=' + address
    })
  },
  onLoad: function (options) {
    let { tab = 0 } = options;
    this.setData({
      tab
    })
    app.pages.add(this);
    this.getList(); 
  },

  tabChange(ev) {
    this.setData({
      page: 1,
      rows: 10,
      tab: ev.detail.key,
      hasNextPage: false,
      list: []
    });
    // let request = [authModel.customerorderlist, authModel.customerorderlist,][this.data.currentTab - 1];
    this._initLoadMore();
    // this.getList(request);
    this.getList();
  },
  getList(request = orderModel.customerorderlist) {
    let _t = this;
    let isShipped = this.data.tab == 0 ? '' : Boolean(this.data.tab - 1);
    let params = { isShipped };
    this._getList({ request, params }, function (res) {
      var e = res.list.reverse();
      _t.setData({
        list: e,
        hasNextPage: res.hasNextPage
      });
    });
  },
})

