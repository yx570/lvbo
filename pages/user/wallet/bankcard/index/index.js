const walletModel = require('../../../../../models/user/wallet/index.js');
let app = getApp();
Page({
  data:{
    list:[],
    stateFormat:{
      1:'审核中',
      2:'审核通过',
      3:'审核未通过'
    },
    cardTypeFormat: {
      1: '储蓄卡',
      // 2: '信用卡'
    },
    currentRow:{}
  },
  onLoad: function () {    
  },
  onShow: function () {
    this.getCards();
  },
  getCards(){
    walletModel.bankCards().then(reponse=>{
      console.log(reponse)
      let data = reponse.data || [];
      data.forEach(v => {
        v.cardNumber = `${v.cardNumber.substr(0, 3)}* **** **** **** ${v.cardNumber.substr(15)}`;
      });
      this.setData({
        list: data
      });
      console.log(data)
      console.log(data.length)
      data.length <= 0 &&
      wx.showModal({
        title: '温馨提示',
        content: '您尚未绑定银行卡，请前往绑定！',
        confirmColor: '#ff5100',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '../bind/index?type=2'
            });
          } else if (res.cancel) {
            wx.navigateBack();
          }
        }
      });
    }).catch(e=>{});
  },
  navigateChange(ev){
    let { type = 1, row } = ev.currentTarget.dataset;
    if (type == 1){
      this.setData({
        currentRow: row
      });
      app.pages.add(this);
    }
    wx.navigateTo({
      url: `../bind/index?type=${type}`,
    });
  }
})