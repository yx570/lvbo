const orderModel = require('../../../models/order/index.js'); 
const app = getApp();
Page({
  // ...app.loadcartlist,
  data: {
    orderInfos: {
      number: '201809192020',
      imageUrl: '/static/images/demo/b1.jpg',
      title: '产品名称大标题',
      total: 3,
      status: 1,
      price: 1000
    },
    list: [
      {
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫',
        star: 5,
        date: '5月1日',
        timeRange: '9:00 ~ 10:00',
        status: 1
      },
      {
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫',
        star: 5,
        date: '5月1日',
        timeRange: '9:00 ~ 10:00',
        status: 2
      },
      {
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫',
        star: 5,
        date: '5月1日',
        timeRange: '9:00 ~ 10:00',
        status: 0
      }
    ]
  },

  // 详情加载
  onLoad: function (ev) {
    
  }
})


