const userModel = require('../../../../models/user/index.js');
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data:{
    infos: {
      total: 5203,
      available: 185
    },
    currentTab: '0',
    tabs: [
      {
        key: '0',
        label: '全部'
      },
      {
        key: '1',
        label: '我的提成'
      },
      {
        key: '2',
        label: '我的消费'
      },
      {
        key: '3',
        label: '我的提现'
      },
    ],
    list: [],
    hasNextPage: false
  },
  onLoad: function () {
    app.setNavTitle(' ')
    app.setNavColor()
  },
  onShow() {
    this.getList();
  },
  tabChange(e){
    let { key } = e.currentTarget.dataset;
    if(key !== this.data.currentTab){
      this.setData({
        currentTab: key
      })
    }
  },
  navChange() {
    wx.navigateTo({
      url: '../withdraw/index',
    })
  },
  getList(request = userModel.currencyQuery) {
    let params = {};
    this._getList({ request, params }, res => {
      let { list, hasNextPage } = res;
      this.setData({
        list,
        hasNextPage
      });
    });
  },
})