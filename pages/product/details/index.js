const productModel = require('../../../models/product/index.js');
const app = getApp();
Page({
  data: {
    //图片地址
    imgList: [],
    orderId: '',
    obj: {},
    num: 1,
    minusStatus: 'disable'
  },
  onLoad: function (ev) {
    this.setData({
      id: ev.id
    })
    let id = this.data.id;
    productModel.view({ id }).then(response => {
      console.log(response.data)
      this.setData({
        obj: response.data,
        imgList: response.data.imgList
      })
    }).catch(e => { });
  },
  //事件处理函数
  /*点击减号*/
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    var num = this.data.num;
    num++;
    this.setData({
      num: num
    })
  },
  /*输入框事件*/
  bindManual: function (e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  }

})