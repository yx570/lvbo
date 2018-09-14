const { absolutePath } = require('../../../../utils/path.js');
const authModel = require('../../../../models/auth/index.js');
const walletModel = require('../../../../models/user/wallet/index.js');
const app = getApp();
Page({
  data:{
    userInfos:{
      userName: '',     //用户名
      photo: '',        //头像
      id: 0
    },
    paths:{
      infos:'../infos/index',
      mobile:'../mobile/index',
      password:'../password/index',
      tradePassword:'../trade/index',
      address:'../../address/index/index'
    },
    isOpen:true
  },
  onLoad: function () {
    let userInfos = wx.getStorageSync('userInfos');
    console.log(userInfos)
    this.setData({
      userInfos
    });
    walletModel.deposit().then(response => {
      this.setData({
        isOpen: response.data.isOpen
      });
    }).catch(error => {});
  },
  // 路由跳转
  navigateChange(ev){
    let { key } = ev.currentTarget.dataset;
    !!key && wx.navigateTo({
      url: this.data.paths[key]
    });
  },
  // 登出
  logout(){
    let _t = this;
    wx.showModal({
      title: '温馨提示',
      content: '确认退出登录吗？',
      confirmColor: '#ff5100',
      success: res=>{
        if(res.confirm){
          authModel.logout().then(response=>{
            wx.clearStorageSync();
            wx.reLaunch({
              url: absolutePath('pages/login/index')
            });
          });
        }
      }
    })
  }
})