const walletModel = require('../../../../../models/user/wallet/index.js');
let app = getApp();
Page({
  data:{
    list:[]
  },
  onLoad: function (options) {  
    let  { id } =  options || {};
    walletModel.bankCards().then(reponse => {
      let data = reponse.data || [];
      let list = [];
      data.forEach(v => {
        v.checked = v.id == id ? true : false;
        v.lastNumber = v.cardNumber.substr(11);
        v.cardNumberFormat = `${v.cardNumber.substr(0, 4)} **** **** ${v.cardNumber.substr(11)}`;
        if (v.auditState.value == 2){
          list.push(v);
        }
      });
      this.setData({
        list
      });
    }).catch(e => { });
  },
  selectCard(ev){
    let { row } = ev.currentTarget.dataset;
    app.pages.get('pages/user/wallet/withdraw/index').setInfos(row);
    wx.navigateBack();
  }
})