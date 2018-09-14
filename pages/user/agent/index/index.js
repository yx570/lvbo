const manageModel = require("../../../../models/manage/index.js");
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data:{
    key: 1,
    tabs:[
      {
        key: 1,
        label:'代理记录'
      },
      {
        key: 2,
        label:'提货审核'
      },
      {
        key: 3,
        label:'回购审核'
      },
      {
        key: 4,
        label:'提货记录'
      },
      {
        key: 5,
        label:'回购记录'
      },
      {
        key: 6,
        label:'核销记录'
      }
    ],
    list:[],
    hasNextPage: false
  },
  onLoad: function (options) {
    if (options.key == 5) {
      this.setData({
        key: 5
      });
    }
    if (options){
      this.setData({
        key: options.key || 1
      }); 
    }
    let request = [
      manageModel.getBusinessOrderPage,
      manageModel.getDeliverApplyPage,
      manageModel.getBuybackApplyPage,
      manageModel.getDeliverPage,
      manageModel.getBuybackPage,
      manageModel.getVerifyPage
    ][this.data.key - 1];
    this._initLoadMore();
    this.getList(request);
  },
  tabChange(ev){
    this.setData({
      page: 1,
      rows: 10,
      key: ev.detail.key,
      hasNextPage: false,
      list: []
    });
    let request = [
      manageModel.getBusinessOrderPage, 
      manageModel.getDeliverApplyPage,
      manageModel.getBuybackApplyPage,
      manageModel.getDeliverPage,
      manageModel.getBuybackPage,
      manageModel.getVerifyPage
    ][this.data.key - 1];
    this._initLoadMore();
    this.getList(request);
  },
  getList(request = manageModel.getBusinessOrderPage) {
    let _t = this;
    let _key = this.data.key;
    this._getList({ request }, function (res) {
     
      if (_key == 3){
        _t.setData({
          list: res.list.reverse(),
          hasNextPage: res.hasNextPage
        });
      }else{
        _t.setData({
          list: res.list,
          hasNextPage: res.hasNextPage
        });
      }
    });
  },
  // 详情 
  toDetails(ev){
    let { key, id } = ev.currentTarget.dataset;
    console.log(key, id )
    wx.navigateTo({
      url: `../details/index?id=${id}&key=${key}`,
    });
  },
  // 提货
  auditGoods(ev){
    let { key, id } = ev.currentTarget.dataset;
    wx.redirectTo({
      url: `../audit/index?id=${id}&key=${key}`,
    });
  }
})