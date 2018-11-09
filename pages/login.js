const app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    console.log('aaa');
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              app.globalData.wxUserInfo = res.userInfo;
              // wx.switchTab({
              //   url: 'tabBar/home/index'
              // })
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    app.globalData.wxUserInfo = e.detail.userInfo;
    // wx.switchTab({
    //   url: 'tabBar/home/index'
    // })
  }
})