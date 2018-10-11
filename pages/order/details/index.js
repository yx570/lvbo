const orderModel = require('../../../models/order/index.js'); 
const app = getApp();
Page({
  // ...app.loadcartlist,
  data: {
    statusFormat: {
      1: "已服务",
      2: "技师已出发",
      3: "服务中",
      4: "待服务"
    },
    orderInfos: {
      number: '201809192020',
      imageUrl: '/static/images/demo/b1.jpg',
      title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
      total: 3,
      status: 1,
      perPrice: 982,
      price: 1000,
    },
    list: [
      {
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫',
        star: 5,
        date: '2018年5月1日',
        star: 3,
        timeRange: '9:00-10:00',
        status: 1
      },
      {
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
        name: '王小丫',
        star: 5,
        date: '2018年5月1日',
        star: 3,
        timeRange: '9:00-10:00',
        status: 2
      },
      {
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫',
        star: 5,
        star: 3,
        date: '2018年5月1日',
        timeRange: '9:00-10:00',
        status: 3
      },
      {
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫',
        star: 3,
        star: 5,
        date: '2018年5月1日',
        timeRange: '9:00-10:00',
        status: 4
      }
    ]
  },

  // 详情加载
  onLoad: function (ev) {
    
  }
})


