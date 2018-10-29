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
    orderInfos: [
      {
        key: '1',
        label: '待付款',
        value: 0,
        icon: 'dfk'
      }, {
        key: '2',
        label: '待服务',
        value: 2,
        icon: 'dfw'
      }, {
        key: '3',
        label: '待评价',
        value: 0,
        icon: 'dpj'
      }, {
        key: '0',
        label: '全部订单',
        value: 0,
        icon: 'qbdd'
      }
    ],
    tools: [
      {
        link: '',
        label: '我的历程',
        icon: 'licheng'
      }, {
        link: '/pages/user/currency/list/index',
        label: '我的新生币',
        icon: 'currency'
      }, {
        link: '/pages/user/voucher/index',
        label: '代金券',
        icon: 'voucher'
      }, {
        link: '/pages/user/address/index',
        label: '服务地址',
        icon: 'address'
      }, {
        link: '/pages/user/recommendCode/index',
        label: '我的推荐码',
        icon: 'code'
      }
    ]
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
  
  },
  navigateChange(e){
    let { key } = e.currentTarget.dataset;
    wx.switchTab({
      url: '/pages/tabBar/order/index'
    });
    app.globalData.currentOrderTab = key;
  }
})