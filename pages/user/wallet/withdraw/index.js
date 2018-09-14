const walletModel = require('../../../../models/user/wallet/index.js');
const app = getApp();
Page({
  data:{
    withdrawInfos:[
      {
        type:1,
        key:'amount',
        label:'提现金额',
        value:'',
        placeholder: '请输入提现金额'
      },
      {
        type:2,
        key:'cardNumberFormat',
        label:'银行卡号',
        value:''
      },
      {
        type:2,
        key:'cardName',
        label:'开户银行',
        value:''
      },
      {
        type:2,
        key:'userName',
        label:'开户姓名',
        value:''
      },
      {
        type:1,
        key:'remark',
        label:'备注',
        value:'',
        placeholder:'选填'
      }
    ],
    paw:{
      key:'tradePassword',
      value:'',
      placeholder:'请输入密码'
    },
    form:{
      tradePassword:'',
      amount: '',
      cardId: '',
      remark:''
    },
    popVisible: false,
    min:100,
  },
  onLoad: function () {
    // this.getCards();
    // app.pages.add(this);
  },
  onShow:function(){
    this.getCards();
    this.getWithdrawSetting();
    app.pages.add(this);
  },
  formSubmit(ev){
    let { amount, remark } = ev.detail.value;
    let { cardId } = this.data.form;
    console.log(amount)
    app.test.num({
      label: '提现金额',
      value: Number(amount),
      min: this.data.min,
      multiple: this.data.min
    }).then(() => {
      this.setData({
        form: {
          tradePassword: '',
          amount: amount,
          cardId: cardId,
          remark: remark
        },
        popVisible: true
      });
    }).catch(error => {
      wx.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000
      });
    });
  },
  submit(ev){
    let { amount, cardId, remark} = this.data.form
    console.log(this.data.form)
    let  tradePassword  = ev.detail.value.tradePassword;
    app.test.str({
      label: '密码',
      value: tradePassword,
      min: 6,
      //multiple: 6
    }).then(() => {
      walletModel.withdrawRequest({ tradePassword, amount, cardId, remark}).then(response => {
      wx.showToast({
        title: '操作成功！',
        icon: 'success',
        duration: 2000
         });
       this.popClose();
       wx.navigateBack();
    }).catch(error => {});
    }).catch(error => {
      wx.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000
      });
    });
   
  },
  wjmm() {
    wx.navigateBack();
    wx.navigateTo({
      url: `../../../../pages/user/account/password/index`,
    });
  },
  itemTap(ev){
    let { key } = ev.currentTarget.dataset;
    if (key == 'cardNumberFormat'){
      wx.navigateTo({
        url: `../bankcard/select/index?id=${this.data.form.cardId}`,
      });
    }
  },
  clearInput(){
    this.setData({
      'form.amount':''
    });
  }, 
  getCards() {
    walletModel.bankCards().then(reponse => {
      let data = reponse.data || [];
      data.forEach(v => {
        v.cardNumberFormat = `${v.cardNumber.substr(0, 3)}* **** **** **** ${v.cardNumber.substr(15)}`;
      });
      this.setInfos(data[0]);
    }).catch(e => {});
  },

  getWithdrawSetting() {
    walletModel.withdrawSetting().then(reponse => {
      console.log(reponse)
      this.setData({
        min: reponse.data.min
      });
    }).catch(e => { });
  },
  setInfos(card){
    this.setData({
      'withdrawInfos[0].value': '',
      'withdrawInfos[4].value': '',
      'form.cardId': card.id,
      'withdrawInfos[1].value': card.cardNumberFormat,
      'withdrawInfos[2].value': card.openingBank,
      'withdrawInfos[3].value': card.ownerName
    });
    console.log(this.data.form)
  },
  //弹窗
  selectTap(ev) {
    this.setData({
      popVisible: true
    });
  },
  popClose(ev) {
    this.setData({
      popVisible: false,
      paw: {
        key: 'tradePassword',
        value: '',
        placeholder: '请输入密码'
      }
    });
  },
})