// pages/login/password/index.js
const authModel = require('../../../models/auth/index.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telphone:'',
    token:'',
    show: true,
  },
  toggleShow() {
    this.setData({
      show: !this.data.show
    });
  },
  // 拿到手机号
  getPhone: function (e) {
    var val = e.detail.value;
    this.setData({
      telphone: val
    });
  },
  getCode: function (ev) {
    var cellPhone = this.data.telphone;
    app.test.all([
      {
        type: 'mobile',
        label: '手机号',
        value: cellPhone,
        min: 6,
        max: 0
      },
    ]).then(() => {
      authModel.getAccountToken({ cellPhone }).then(response => {
        console.log(response);
        this.setData({
          token: response.data
        });
        wx.showToast({
          title: '已发送验证码，请注意查收',
          icon: "none",
          duration: 2000
        });
      })
    }).catch((err) => {
      // console.log('error!!!');
      // console.log(err);
      wx.showToast({
        title: err.message,
        icon: "none",
        duration: 200
      });
    });

  }
  ,
  formSubmit: function (ev) {
  
    let token = this.data.token;
    let { cellPhone, code, password } = ev.detail.value;
    app.test.all([
      {
        type: 'mobile',
        label: '手机号',
        value: cellPhone,
        min: 6,
        max: 0
      },
      {
        type: 'string',
        label: '验证码',
        value: code,
        min: 6,
        max: 0
      },
      {
        type: 'password',
        label: '密码',
        value: password,
        min: 6,
        max: 0
      }
    ]).then(() => {
      authModel.resetPassword({ token, code, password }).then(response => {
        console.log(response);
        wx.navigateTo({
          url: '../index'
        })
      })
    }).catch((err) => {
      // console.log('error!!!');
      // console.log(err);
      wx.showToast({
        title: err.message,
        icon: "none",
        duration: 2000
      });
    });

  },

})