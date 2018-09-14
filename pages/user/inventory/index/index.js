const manageModel = require("../../../../models/manage/index.js");
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data: {
    currentTab:1,
    tabs: [
      {
        key: 1,
        label: '库存列表'
      },
      {
        key: 2,
        label: '库存记录'
      }
    ],
    list: [],
    hasNextPage: false
  },
  onLoad(options){
    this.getList();
  },
  tabChange(ev) {
    this.setData({
      page: 1,
      rows: 10,
      currentTab: ev.detail.key,
      hasNextPage: false,
      list: []
    });
    let request = [manageModel.stockList, manageModel.stockLogs][this.data.currentTab - 1];
    this._initLoadMore();
    this.getList(request);
  },
  getList(request = manageModel.stockList){
    let _t = this;
    this._getList({ request }, function (res) {
      _t.setData({
        list: res.list,
        hasNextPage: res.hasNextPage
      });
    });
  },
  toDetails(ev){
    let { goodsName, sku, skuId } = ev.currentTarget.dataset.row;
    wx.navigateTo({
      url: `../details/index?goodsName=${goodsName}&sku=${sku}&skuId=${skuId}`,
    });
  }
})