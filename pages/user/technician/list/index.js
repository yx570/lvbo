const orderModel = require('../../../../models/order/index.js');
const app = getApp();
Page({ 
  ...app.loadMoreMethods,
  data: {
    infos: {
      name: '王晓丽'
    },
    tabs: [
      {
        key: '0',
        label: '我的工单'
      }, 
      {
        key: '1',
        label: '已完成工单'
      }
    ],
    currentTab: '0',
    list: [
      {
        id: 1,
        title: '推腹Jamu',
        imageUrl: '../../../../static/images/demo/comment1.jpg',
        name: '张雪薇',
        mobile: '13728282626',
        datetime: '5月8日 9:00-10:30',
        status: 1,
        process: [
          {
            time: '5月8日 9:00-10:30',
            content: '技师出发'
          }, {
            time: '5月8日 9:00-10:30',
            content: '技师到达'
          }, {
            time: '5月8日 9:00-10:30',
            content: '技师确认开始'
          }
        ]
      }, {
        id: 2,
        title: '推腹Jamu',
        imageUrl: '../../../../static/images/demo/comment1.jpg',
        name: '张雪薇',
        mobile: '13728282626',
        datetime: '5月8日 9:00-10:30',
        status: 2,
        process: []
      }, {
        id: 3,
        title: '推腹Jamu',
        imageUrl: '../../../../static/images/demo/comment1.jpg',
        name: '张雪薇',
        mobile: '13728282626',
        datetime: '5月8日 9:00-10:30',
        status: 3,
        process: []
      }
    ], 
    hasNextPage: false
  },
  getList () {
    let _t = this;
    this._getList({
      request: orderModel.goods
    }, function (res) {
      _t.setData({
        list: res.list,
        hasNextPage: !res.hasNextPage
      });
    });  
  },
  tabChange(e) {
    let { key } = e.currentTarget.dataset;
    if (key !== this.data.currentTab) {
      this.setData({
        currentTab: key
      })
    }
  },
  makeCall(e) {
    let { mobile } = e.currentTarget.dataset;
    wx.makePhoneCall({
      phoneNumber: mobile
    });
  },
  //load
  onLoad (e) {
    // this.getList();
    app.setNavTitle(`我(${ this.data.infos.name })的工单`);
    app.setNavColor();
  },
  onShow () {
    
  },
  onHide(){
    
  }
})


