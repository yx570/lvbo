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
        label:'线上订单管理',
        key:'orders',
        icon:'icon-iconlist'
      },
      {
        label:'代理商管理',
        key:'agent',
        icon:'icon-icon_user'
      },
      {
        label:'销售管理',
        key:'sell',
        icon:'icon-handbag'
      },
      {
        label:'库存管理',
        key:'inventory',
        icon:'icon-inventory'
      }
    ],
    navPaths:{
      wallet:'../../user/wallet/index/index',
      orders: "../../work/order/index?tab=0",
      agent:'../../user/agent/index/index',
      sell:'../../user/sell/index/index',
      inventory:'../../user/inventory/index/index',
      account:'../../user/account/index/index',
      purchase:'../../work/purchase/index?num=0',
      unpaid:'../../work/purchase/index?num=1',
      shipping:'../../work/purchase/index?num=2',
      thsh: '../../purchase/service/index',
      Warehousing: '../../user/Warehousing/index'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  navigateChange(ev){
    let { key } = ev.currentTarget.dataset;
    wx.navigateTo({
      url: this.data.navPaths[key]
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfos = wx.getStorageSync('userInfos');
    this.setData({
      userInfos
    });
    const requests = [
      memberModel.info(),
      memberModel.tasks()
    ];
    Promise.all(requests).then(res => {
      // console.log(res);
      this.setData({
        balance: res[0].data.validBalance,
        task:{
          unpaid: res[1].data.unpaid,
          shipping: res[1].data.shipping
        }
      });
    }).catch(err => {
      console.log(err);
    });
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