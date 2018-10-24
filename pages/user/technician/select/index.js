// const userModel = require('../../../../models/user/index.js');
const app = getApp();
Page({ 
  data: {
    list: [
      {
        id: 1,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        name: '王小丫1',
        svTimes: '100',
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
        svTimes: '100',
        date: '2018-05-01',
        startTime: "2018-10-19 21:50:00",
        star: 3,
        timeRange: '9:00-10:00',
        h: "21",
        m: "50",
        s: "33",
        status: 3
      },
      {
        id: 3,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
        name: '王小丫3',
        svTimes: '100',
        date: '2018-05-01',
        star: 3,
        timeRange: '9:00-10:00',
        status: 5
      },
      {
        id: 5,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题',
        svTimes: '100',
        name: '王小丫5',
        star: 3,
        date: '2018-05-01',
        timeRange: '9:00-10:00',
        status: 4
      }
    ]
  },
  onLoad: function (ev) {
    let id = ev.id;
    this.setData({
      id: id
    })
  },
  onShow: function () {
    
  },
  toComment: function (ev) {
    wx.navigateTo({
      url: '../details/index?id=' + ev.currentTarget.dataset.id
    })
  },
  sureSelected(e) {
    let pages = getCurrentPages();
    let pageUrl = pages[pages.length - 2].route;
    console.log('this:' + pageUrl)
    if (pageUrl.indexOf('tabBar') > -1) {
      wx.switchTab({
        url: '/' + pageUrl
      })
    } else {
      wx.navigateTo({
        url: '/' + pageUrl
      })
    }
  }

  
})


