// pages/user/technician/index.js
let walletModel = require('../../../../models/user/wallet/index');
let memberModel = require('../../../../models/user/member/index');
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
    serviceTimes: 100,
    star: 4,
    remark: '刘诗诗，原名刘诗施，1987年3月10日出生于北京市，中国内地影视女演员、影视出品人。2002年，考入北京舞蹈学院芭蕾舞专业本科班学习。',
    list: [
      {
        id: 1,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫1',
        date: '2018-05-01',
        star: 3,
        timeRange: '9:00-10:00',
        status: 1
      },
      {
        id: 2,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
        name: '王小丫2',
        date: '2018-05-01',
        star: 3,
        timeRange: '9:00-10:00',
        status: 2
      },
      {
        id: 3,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
        name: '王小丫3',
        date: '2018-05-01',
        star: 3,
        timeRange: '9:00-10:00',
        status: 5
      },
      // {
      //   id: 4,
      //   imageUrl: '/static/images/demo/b1.jpg',
      //   title: '产品名称大标题',
      //   name: '王小丫4',
      //   star: 5,
      //   date: '2018-05-01',
      //   startTime: "2018/10/11 21:50:00",
      //   timeRange: '9:00-10:00',
      //   status: 3
      // },
      {
        id: 5,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫5',
        star: 3,
        date: '2018-05-01',
        timeRange: '9:00-10:00',
        status: 4
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.setNavTitle('技师详情')
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
  
  }
})