const walletModel = require('../../../../models/user/wallet/index.js');
const app = getApp();
Page({
  data:{
    form:{
      code:'',
      password:''
    },
    showPassword:false,
    codeInterval: 180,
    codeBtnTxt: '获取验证码',
    codeTimer: null
  },
  toggleShow(ev){
    let { key } = ev.currentTarget.dataset;
    this.setData({
      showPassword: !this.data.showPassword
    });
  },
  inputChange(ev){
    let { key } = ev.currentTarget.dataset;
    let { value } = ev.detail;
    this.setData({
      [`form.${key}`]: value
    });
  },
  formSubmit(ev){
    let { password } = ev.detail.value;
    app.test.all([
      {
        type: 'string',
        label: '交易密码',
        value: password,
        min:6,
        max:6
      }
    ]).then(()=>{
      // 验证通过todo
      walletModel.establish({
        tradePassword: password
      }).then(response=>{
        console.log(response)
        wx.navigateBack();
        wx.showToast({
          title: '操作成功！',
          icon: 'success',
          duration: 2000
        });
      }).catch(error=>{});
    }).catch(error=>{
      // 验证不通过
      wx.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000
      })
    });
  },
  closeCodeTimer() {
    this.data.codeTimer && clearInterval(this.data.codeTimer);
    this.setData({
      codeInterval: 180,
      codeBtnTxt: '获取验证码',
      codeTimer: null
    });
  },
  openCodeTimer() {
    let _t = this;
    let timer = null;

    _t.closeCodeTimer();
    timer = setInterval(function () {
      if (_t.data.codeInterval > 0) {
        _t.setData({
          codeInterval: _t.data.codeInterval - 1,
          codeBtnTxt: `${_t.data.codeInterval}s 后重新获取`
        });
      } else {
        _t.closeCodeTimer();
      }
    }, 1000);
    _t.setData({
      codeBtnTxt: `${_t.data.codeInterval}s 后重新获取`,
      codeTimer: timer
    });
  },
  getCode(ev) {
    if (this.data.codeTimer) return
    if (this.data.isValidated) {
      app.test.mobile({
        label: '新手机号',
        value: this.data.form.mobile
      }).then(() => {
        authModel.smsCodePhoneNew({
          cellPhone: this.data.form.mobile
        }).then(response => {
          this.openCodeTimer();
        });
      }).catch(e => {
        wx.showToast({
          title: e.message,
          icon: 'none',
          duration: 2000
        })
      });
    } else {
      authModel.smsCodePhoneOld().then(response => {
        this.openCodeTimer();
      });
    }
  }
})