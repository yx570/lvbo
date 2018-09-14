const authModel = require('../../../../models/order/index.js');
const app = getApp();

Page({
  data: {
    searchSongList: [],
    tracesList: [],
    packageId:'',
    currentRow:{},
    Accepttime: [
      {
        m: '',
        s: '',
      }
    ]
  }, 
  onLoad: function (e) {
    console.log(e.orderId)
    let orderId = e.orderId;
     //包裹信息 
    authModel.packages({ orderId }).then(response => {
      this.setData({
        searchSongList: response.data,
        packageId:response.data[0].id
      });
      //物流信息 
      let packageId = this.data.packageId;
      console.log(packageId)
      authModel.traces({ packageId }).then(response => {
        console.log(response);
        var e = response.data.reverse();
        console.log(e)
        this.setData({
          tracesList: e,
        });
      }).catch(error => { });
     }).catch(error => {});

  },
  
  //复制快递号
  copyTBL: function (e) {
    wx.setClipboardData({
      data: e.target.dataset.name,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            // console.log(res.data) // data
            wx.showToast({
              title: '复制成功',
              icon: "none",
              duration: 2000
            });
          }
        })
      }
    })
  },
  // 电话点击事件
  phonecallevent: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phonecall
    })
  }, 

})