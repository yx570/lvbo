const payModel = require('../../models/pay/index.js');
const app = getApp();
Component({
  options: {
    multipleSlots: true
  },
  externalClasses: [
    'iconfont',
    'icon-wallet',
    'icon-weixin',
    'icon-money',
    'icon-checkbox-checked',
    'color-primary'
  ],
  properties: {
    styles: {
      type: String,
      value: ''
    },
    visible: {
      type: Boolean,
      value: false
    },
    transparentMask: {
      type: Boolean,
      value: false
    },
    maskClose: {
      type: Boolean,
      value: true
    },
    selected: {
      type: Boolean,
      value: false
    },
    payType: {
      type: Number,
      value: 1
    },
    orderId: {
      type: String,
      value: ''
    },
    totalPrices: {
      type: String,
      value: ''
    },
    method: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    receiverId: {
      type: String,
      value: ''
    }
  },
  data: {
    tradePassword: '',
    titleText: '订单支付',
    method: '',
    err:''
  },
  ready() {
   
  },
  methods: {
    closePop() {
      wx.navigateBack();
      this.setData({
        visible: false
      });
      this.triggerEvent('close', {});
    },
    selectType(ev) {
      let { type } = ev.currentTarget.dataset;
      this.setData({
        payType: type
      });
    },
    passwordChange(ev) {
      let { value } = ev.detail;
      if (ev.detail.value.length == 6) {
        wx.hideKeyboard();
      }
      this.setData({
        tradePassword: value
      });
    },
    cancel() {
      wx.redirectTo({
        url: `../../work/purchase/index?num=1`
      })
      // this.closePop();
    },
    comfirm() {
      if(this.properties.payType == 2){
         this.wexinPay();
      }else{
        if (this.properties.selected) {
          if (this.properties.payType == 1) {
            this.balancePay();
          } else {
            this.wexinPay();
          }
        } else {
          this.setData({
            selected: true
          });
        }
      }
    },
    payCommon(callback = function () { }) {
      let { orderId } = this.properties;
      payModel.getMethods({
        type: 1
      }).then(response => {
        console.log(this.properties.payType)
        if (this.properties.payType == 1) {
          this.setData({
            method: response.data[0].value
          });
        } else {
          this.setData({
            method: response.data[1].value
          });
        }
        let paymentPluginId = this.data.method;
        !!paymentPluginId && payModel.paymentSubmit({
          type: 1,
          orderId,
          paymentPluginId
        }).then(response1 => {
          let data = response1.data || {};
          typeof callback == 'function' && callback(data);
        }).catch(err1 => { 
          console.log(err1.data.msg)
          wx.redirectTo({
            url: `../../../pages/cart/fill/pay/index?type=2&&totalPrices=` + this.data.totalPrices + "&&orderId=" + this.data.orderId + "&&err=" + err1.data.msg
          })
        });
      }).catch(err => { });
    },
    balancePay() {
      console.log("钱包")
      let { tradePassword, orderId, totalPrices } = this.data;
      console.log(this.data)
      app.test.password({
        label: '交易密码',
        value: tradePassword,
        min: 6,
        rule: 2
      }).then(() => {
        this.payCommon(data => {
          let { sn } = data;
          payModel.balancePay({
            sn,
            tradePassword
          }).then(response => {
            this.triggerEvent('success', {});
            wx.redirectTo({
              url: `../../../pages/cart/fill/pay/index?type=1&&totalPrices=` + this.data.totalPrices + "&&orderId=" + this.data.orderId + "&&err=1"
            })
          }).catch(err => {
            console.log(err.data.msg)
            wx.redirectTo({
              url: `../../../pages/cart/fill/pay/index?type=2&&totalPrices=` + this.data.totalPrices + "&&orderId=" + this.data.orderId + "&&err=" + err.data.msg
            })
          });
        });
        }).catch(error => {
        wx.showToast({
          title: error.message,
          icon: 'none',
          duration: 3000
        });

      });
    },
    wexinPay() {
      console.log("微信")
      this.payCommon(data => {
        let { payPluginId, paymentName, sn, extra = {} } = data;
        let { timeStamp, nonceStr, paySign, } = extra;
        wx.requestPayment({
          timeStamp,
          nonceStr,
          paySign,
          package: extra.package,
          'signType': 'MD5',
          success: function (res) {
            this.triggerEvent('success', {});
            console.log(res)
            wx.redirectTo({
              url: `../../../pages/cart/fill/pay/index?type=1&&totalPrices=` + this.data.totalPrices + "&&orderId=" + this.data.orderId
            })
          },
          fail: function (res) {
            wx.redirectTo({
              url: `../../../pages/cart/fill/pay/index?type=2&&totalPrices=` + this.data.totalPrices + "&&orderId=" + this.data.orderId
            })
          }
        });
      });
    }
  }
})