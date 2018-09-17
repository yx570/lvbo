const productModel = require('../../../models/product/index.js');
const app = getApp();
Page({
  data: {
    //图片地址
    imgList: [],
    orderId: '',
    obj: {},
    num: 1,
    selectIndex: 0,
    minusStatus: 'disable',
    priceInt: 0,
    priceFloat: 0
  },
  onLoad (ev) {
    this.setData({
      id: ev.id
    })
    let id = this.data.id;
    productModel.view({ id }).then(response => {
      this.splitPrice(response.data.price)
      this.setData({
        obj: response.data,
        imgList: response.data.imgList
      })
    }).catch(e => { });
  },
  priceChange (ev) {
    this.setData({
      selectIndex: ev.currentTarget.dataset.index
    })
  },
  splitPrice(price) {
    let [p1, p2] = price.split('.');
    this.setData({
      priceInt: p1 || 0,
      priceFloat: p2 || '00'
    })
  }
})