const walletModel = require('../../../../../models/user/wallet/index.js');
let app = getApp();
Page({
  data:{
    form:{
      bankType:1,
      userName:'',
      bankName:'',
      bankNumber:'',
      idcard:'',
      mobile:''
    },
    bankTypes: {
      1: '储蓄卡',
      // 2: '信用卡'
    },
    labelFormat:{
      bankType: '银行卡类型',
      userName: '开户名',
      idcard: '身份证',
      mobile: '手机号码',
      bankName: '开户银行',
      bankNumber: '银行卡号'
    },
    tradePassword: '',
    currentCardId:0,
    isBindCard:false,
    popVisible:false,
    popType:1,
    flag: true,
  },
  hide: function () {
    this.setData({ flag: true,  })
  },

  onLoad(options){  
    console.log(1+this.data.tradePassword)
    let { type = 1 } = options || {};
    if (type == 1) {
      let { currentRow } = app.pages.get('pages/user/wallet/bankcard/index/index').data;
      this.setData({
        isBindCard: false,
        form:{
          bankType: currentRow.cardType.value,
          userName: currentRow.ownerName,
          bankName: currentRow.openingBank,
          bankNumber: currentRow.cardNumber,
          idcard: `${currentRow.ownerIdCardNo.substr(0, 3)}* **** **** ** ${currentRow.ownerIdCardNo.substr(14)}`,
          mobile: `${currentRow.ownerPhoneNumber.substr(0, 3)}* **** ${currentRow.ownerPhoneNumber.substr(7)}`
            
        },
        currentCardId: currentRow.id
      });
    } else {
      this.setData({
        isBindCard:true
      });
    }  
  },
  typeSelect(ev){
    this.setData({
      form: Object.assign({},this.data.form,{
        bankType: ev.currentTarget.dataset.type
      }),
      popVisible: false
    });
  },
  tradePasswordChange(ev){
    let { value } = ev.detail;
    this.setData({
      tradePassword: value
    });
  },
  passwordInputChange(ev){
    let { value } = ev.detail;
    this.setData({
      tradePassword: value.join('')
    });
  },
  openPop(){
    this.setData({
      popVisible: true
    });
  },
  closePop(){
    this.setData({
      popVisible: false,
      popType: 1,
      tradePassword: ''
    });
  },
  bindCard(params){
    console.log(params)
    walletModel.bindBankCard(params).then(response => {
      wx.showToast({
        title: '操作成功！',
        icon: 'success',
        duration: 2000
      });
      wx.navigateBack();
    }).catch(e => {});
  },
  unBindCard(){
    console.log(1)
    let params = {
      id: this.data.currentCardId,
      tradePassword: this.data.tradePassword
    };
    walletModel.unbindBankCard(params).then(response => {
      wx.showToast({
        title: '操作成功！',
        icon: 'success',
        duration: 2000
      });
      this.closePop();
      wx.navigateBack();
    }).catch(e => { });
  },
  switchChange(ev){
    this.setData({
      form:Object.assign({},this.data.form,{
        default: ev.detail.value
      })
    });
  },
  formSubmit(ev){
    console.log(ev);
    let { 
      bankType,
      userName,
      bankName,
      bankNumber,
      idcard,
      mobile
    } = ev.detail.value;
    if (this.data.isBindCard){
      app.test.all([
        {
          type: 'string',
          label: '开户名',
          value: userName,
          min: 1
        },
        {
          type: 'string',
          label: '开户银行',
          value: bankName
        },
        {
          type: 'string',
          label: '银行卡号',
          value: bankNumber,
          min: 16
        },
        {
          type: 'string',
          label: '身份证',
          value: idcard,
          min: 18
        },
        {
          type: 'mobile',
          label: '手机号码',
          value: mobile
        }
      ]).then(()=>{
        this.bindCard({
          bankName: bankName,
          accountName: userName,
          accountNumber:bankNumber,
          identityCard: idcard,
          cellPhone: mobile
        });
      }).catch(error=>{
        wx.showToast({
          title: error.message,
          icon: 'none',
          duration: 2000
        });
      });
    }else{
      this.setData({
        popType: 2,
        popVisible: true,
        flag: false,
        tradePassword: ''
      });
    }
  }
})