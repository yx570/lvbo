const orderModel = require('../../../models/order/index.js');
const app = getApp();
Page({
  // ...app.loadcartlist,
  data: {
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
        startTime: "2018-10-18 21:50:00",
        star: 3,
        timeRange: '9:00-10:00',
        status: 3
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

  // 详情加载
  onLoad: function (ev) {
    
  }
})


