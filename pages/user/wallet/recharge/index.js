const payModel = require('../../../../models/pay/index.js');
const app = getApp();
Page({
  data:{
    rechargeTotal:''
  },
  onLoad: function () {    
  },
  formSubmit(ev){
    let { rechargeTotal } = ev.detail.value;
    app.test.num({
      label: '充值金额',
      value: Number(rechargeTotal),
      min: 0.01
    }).then(()=>{
      let amount = Number(rechargeTotal);
      this.wexinPay(amount);
    }).catch(error=>{
      wx.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000
      });
    });
  },
  clearInput(){
    this.setData({
      rechargeTotal:''
    });
  },
  payCommon(amount,callback = function () { }) {
    payModel.getMethods({
      type: 2
    }).then(response => {
      console.log(response)
      let paymentPluginId = response.data[0].value;
      !!paymentPluginId && payModel.paymentSubmit({
        type: 2,
        paymentPluginId,
        amount
      }).then(response1 => {
        let data = response1.data || {};
        typeof callback == 'function' && callback(data);
      }).catch(err1 => { });
    }).catch(err => { });
  },
  wexinPay(amount) {
    this.payCommon(amount,data => {
      console.log(data)
      let { payPluginId, paymentName, sn, extra = {} } = data;
      let { timeStamp, nonceStr, paySign, } = extra;
      wx.requestPayment({
        timeStamp,
        nonceStr,
        paySign,
        package: extra.package,
        'signType': 'MD5',
        success: function (res) {
          // this.triggerEvent('success', {});
          wx.navigateBack({
            delta:1
          })
          console.log("成功"+res)
        },
        fail: function (res) {
          console.log("失败" + res)
        }
      });
    });
  },
})