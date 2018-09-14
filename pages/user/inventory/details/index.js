const manageModel = require("../../../../models/manage/index.js");
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data: {
    goods: {
      goodsName: '金谷酱酒',
      sku: '201807061413'
    },
    skuId: 0,
    list: [],
    hasNextPage: false,
    typeFormat:{
      purchase_in: '采购入库',
      verify_out: '核销出库',
      buyback_in: '回购入库',
      shipping_out: '订单发货出库'
    }
  },
  onLoad(options){
    let { goodsName, sku, skuId = 0 } = options;
    this.setData({
      goods: {
        goodsName,
        sku
      },
      skuId
    });
    // this.getList(skuId);
    manageModel.stockLogs({ skuId }).then(response => {
      console.log(response)
      this.setData({
        list: response.data.content
      });
    }).catch(e => { });
  },
  getList(skuId) {
    // manageModel.stockLogs({
    //   skuId,
    //   page,
    //   rows
    // }).then(response => {
    //   let { page, totalPages, content = [] } = response.data || {};
    //   this.setData({
    //     hasNextPage: (totalPages > page ? true : false),
    //     list: [...this.data.list, ...content]
    //   });
    // }).catch(e => { });
    let _t = this;
    this._getList({ 
      request: manageModel.stockLogs, 
      parmas: { skuId } 
    }, function (res) {
      _t.setData({
        list: res.list,
        hasNextPage: res.hasNextPage
      });
    });
  }
})