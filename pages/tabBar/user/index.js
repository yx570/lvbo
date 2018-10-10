// pages/tabBar/user/index.js
let walletModel = require('../../../models/user/wallet/index');
let memberModel = require('../../../models/user/member/index');
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfos: {
      userName: '',     //用户名
      photo: '',        //头像
      id: 0
    },
    task:{
      unpaid: 0,           //未支付订单数  
      shipping: 0          //未收货订单数 
    },
    balance: 0,
    navs:[
      {
        label:'我的订单',
        key:'order',
        icon:'icon-iconlist'
      },
      {
        label:'我的预约',
        key:'reservation',
        icon:'icon-date'
      },
      {
        label:'我的推荐码',
        key:'code',
        icon:'icon-tuijianma'
      },
      {
        label:'我的新生币',
        key:'currency',
        icon:'icon-money'
      },
      {
        label: '我的代金券',
        key: 'voucher',
        icon: 'icon-youhuiquan'
      },
      {
        label: '我的历程',
        key: 'course',
        icon: 'icon-licheng'
      }
    ],
    navPaths:{
      address:'../../user/address/index',
      order: "../order/index",
      reservation:'../../user/reservation/list/index',
      code:'../../user/code/index',
      currency:'../../user/currency/list/index',
      voucher:'../../user/voucher/index',
      course:'../../user/course/index',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavTitle(' ')
    app.setNavColor()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  navigateChange(ev){
    let { key } = ev.currentTarget.dataset;
    if(!key) return
    switch (key){
      case 'order':
        wx.switchTab({
          url: this.data.navPaths[key],
        })
        break;
      default:
        wx.navigateTo({
          url: this.data.navPaths[key]
        })
        break;
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfos = wx.getStorageSync('userInfos');
    this.setData({
      userInfos
    });
    // const requests = [
    //   memberModel.info(),
    //   memberModel.tasks()
    // ];
    // Promise.all(requests).then(res => {
    //   this.setData({
       
    //   });
    // }).catch(err => {
    //   console.log(err);
    // });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  }
})