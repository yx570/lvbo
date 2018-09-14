const manageModel = require("../../../../models/manage/index.js");
const app = getApp();
Page({
  data:{
    productInfos: {
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
    skuId: 0,
    quantity:''
  },
  onLoad (options){ 
    let { skuId } = options || {};
    let { currentRow } = app.pages.get('pages/user/sell/index/index').data;
    this.setData({
      skuId,
      productInfos: currentRow
    });   
  },
  formSubmit(ev){
    let { skuId } = this.data;
    let { quantity } = ev.detail.value;
    app.test.num({
      label:'核销数量',
      value: Number(quantity),
      min: 1,
      integer: true
    }).then(()=>{
      manageModel.stockVerify({ skuId, quantity }).then(response=>{
        console.log(response)
        wx.showToast({
          title: '操作成功！',
          icon: 'success',
          duration: 2000
        });
        wx.redirectTo({
          url: '../index/index?key=3',
        });
      }).catch(e=>{});
    }).catch(error=>{
      wx.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000
      });
    });
  }
})