
const app = getApp();
Page({
  data:{
    infos: {
      account: 'wangfei',
      name: '王菲',
      phone: '13838485868',
      total: 200
    },
    form: {
      receiptType: 1,
      amount: ''
    },
    receiptType: 0,
    receiptTypes: [
      {
        label: '微信',
        value: 1
      },
      {
        label: '支付宝',
        value: 2
      }
    ]
  },
  onLoad: function () {
    
  },
  pickerChange(e) {
    let { value } = e.detail;
    this.setData({
      receiptType: value,
      'form.receiptType': value
    })
  },
  formSubmit(e) {
    wx.navigateTo({
      url: '../list/index',
    })
  }
})