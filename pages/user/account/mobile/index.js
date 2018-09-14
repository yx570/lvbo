let app = getApp();
const authModel = require('../../../../models/auth/index.js');
Page({
  data:{
    currentMobile:'',
    form:{
      mobile:'',
      code:''
    },
    isValidated:false,
    codeInterval:180,
    codeBtnTxt:'获取验证码',
    codeTimer:null
  },
  onLoad(){
    let { cellPhone = '' } = wx.getStorageSync('userInfos');
    console.log(wx.getStorageSync('userInfos'))
    this.setData({
      currentMobile: `${cellPhone.substr(0, 3)}****${cellPhone.substr(7)}`
    });
  },
  closeCodeTimer(){
    this.data.codeTimer && clearInterval(this.data.codeTimer);
    this.setData({
      codeInterval: 180,
      codeBtnTxt: '获取验证码',
      codeTimer: null
    });
  },
  openCodeTimer(){
    let _t = this;
    let timer = null;

    _t.closeCodeTimer();
    timer = setInterval(function () {
      if (_t.data.codeInterval > 0){
        _t.setData({
          codeInterval: _t.data.codeInterval - 1,
          codeBtnTxt: `${_t.data.codeInterval}s 后重新获取`
        });
      }else{
        _t.closeCodeTimer();
      }
    }, 1000);
    _t.setData({
      codeBtnTxt: `${_t.data.codeInterval}s 后重新获取`,
      codeTimer: timer
    });
  },
  getCode(ev){
    if (this.data.codeTimer) return
    if (this.data.isValidated){
      app.test.mobile({
        label: '新手机号',
        value: this.data.form.mobile
      }).then(()=>{
        authModel.smsCodePhoneNew({
          cellPhone: this.data.form.mobile
        }).then(response => {
          this.openCodeTimer();
        });
      }).catch(e=>{
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      });
    } else{
      authModel.smsCodePhoneOld().then(response=>{
        this.openCodeTimer();
      });
    }
  },
  formSubmit(ev){
    let { mobile, code } = ev.detail.value;
    if (this.data.isValidated){
      app.test.all([
        {
          type: 'mobile',
          label: '新手机号',
          value: mobile
        },
        {
          type: 'string',
          label: '验证码',
          value: code
        }
      ]).then(() => {
        authModel.phoneChange({ code, cellPhone: mobile }).then(response => {
          wx.navigateBack();
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          });
          wx.setStorageSync('userInfos.cellPhone', mobile);
        });
      }).catch(error => {
        wx.showToast({
          title: error.message,
          icon: 'none',
          duration: 2000
        })
      });
    } else{
      app.test.str({
        label: '验证码',
        value: code
      }).then(()=>{
        authModel.phoneValidate({ code }).then(response=>{
          this.setData({
            form: {
              mobile: '',
              code: ''
            },
            isValidated: true
          });
          this.closeCodeTimer();
        });
      }).catch(error=>{
        wx.showToast({
          title: error.message,
          icon: 'none',
          duration: 2000
        })
      });
    }
  },
  onHide(){
    this.closeCodeTimer();
  }
})