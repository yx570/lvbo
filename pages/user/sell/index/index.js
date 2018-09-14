const manageModel = require("../../../../models/manage/index.js");
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data: {
    currentTab:1,
    tabs: [
      {
        key: 1,
        label: '商品列表'
      },
      {
        key: 2,
        label: '可核销商品'
      },
      {
        key: 3,
        label: '核销记录'
      }
    ],
    currentRow:{},
    list: [],
    hasNextPage: false,
  },
  onLoad: function (options) {
    if (options.key == 3){
      this.setData({
        currentTab: 3
      });
    }
    app.pages.add(this);
    let request = [manageModel.stockList, manageModel.stockList, manageModel.stockVerifyProduct][this.data.currentTab - 1];
    this._initLoadMore();
    this.getList(request);
  },
  toDetails(ev) {
    // console.log()
    let { skuId } = ev.currentTarget.dataset.row;
    this.setData({
      currentRow: ev.currentTarget.dataset.row
    });
    wx.navigateTo({
      url: `../details/index?skuId=${skuId}&&currenttab=` + ev.currentTarget.dataset.currenttab,
    });
  },
  goToCancel(ev){ 
    let { id,row } = ev.currentTarget.dataset;
    this.setData({
      currentRow: row
    });
    console.log(id, row)
    wx.redirectTo({
      url: `../cancel/index?skuId=${id}`,
    });
  },
  tabChange(ev) {
    console.log(ev)
    this.setData({
      page: 1,
      rows: 10,
      currentTab: ev.detail.key,
      hasNextPage: false,
      list: []
    });
    let request = [manageModel.stockList, manageModel.stockList, manageModel.stockVerifyProduct][this.data.currentTab - 1];
    this._initLoadMore();
    this.getList(request);
  },
  getList(request = manageModel.stockList) {
    let _t = this;
    let params = {};
    this.data.currentTab == 2 && (params.canVerify = true);
    this._getList({ request, params }, function (res) {
      _t.setData({
        list: res.list,
        hasNextPage: res.hasNextPage
      });
    });
  }
})