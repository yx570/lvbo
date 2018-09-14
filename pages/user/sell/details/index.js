const manageModel = require("../../../../models/manage/index.js");
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data:{
    skuId: 0,
    productInfos:{
      skuId: 0,
      goodsName: '',
      picture: '',
      skuContent: '',
      stock: 0,
      sku: '',
      verifyCount: 0,
      price: '0',
      verifyTime: ''
    },
    productList:[],
    hasNextPage: false,
    list:[],
    currenttab:1
  },
  onLoad(options){  
    this.setData({
      currenttab: options.currenttab
    });
    let { skuId } = options;
    manageModel.stockDetail({ skuId }).then(response => { 
      this.setData({
        productList: response.data
      });
    }).catch(e => { });
    let { currentRow } = app.pages.get('pages/user/sell/index/index').data;
    this.setData({
      skuId,
      productInfos: currentRow
    });
    this._initLoadMore({
      rows: 20
    });
    this.getList(skuId);
  },
  getList(skuId) {
    console.log(skuId)
    let _t = this;
    this._getList({ 
      request: manageModel.stockVerifyLogs,
      params:{
        skuId
      } 
    }, function (res) {
      _t.setData({
        list: res.list,
        hasNextPage: res.hasNextPage
      });
    });
  }
})