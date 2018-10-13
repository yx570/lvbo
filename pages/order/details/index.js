const orderModel = require('../../../models/order/index.js');
const util = require('../../../utils/utils.js');
const app = getApp();
Page({
  // ...app.loadcartlist,
  data: {
    h: '00',
    m: '00',
    s: '00',
    statusFormat: {
      1: "已服务",
      2: "技师已出发",
      5: "技师已到达",
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

  // 详情加载
  onLoad: function (ev) {
    this.getServicesTime();
  },
  getServicesTime() {
    let startTime
    this.data.list.forEach(function (value, index, arrSelf) {
      if (value.status == 3) {
        startTime = value.startTime
      }
    })
    let now = util.formatTime(new Date());
    let oldTime = new Date(startTime).getTime() / 1000;
    let newTime = new Date(now).getTime() / 1000;
    let serviceTime = newTime - oldTime;

    //计算相差小时数
    let leave1 = serviceTime % (60 * 60)    //计算天数后剩余的毫秒数
    let h = Math.floor(serviceTime / (60 * 60))
    //计算相差分钟数
    let leave2 = leave1 % (60 * 60)        //计算小时数后剩余的毫秒数
    let m = Math.floor(leave2 / (60))
    //计算相差秒数
    let leave3 = leave2 % (60)      //计算分钟数后剩余的毫秒数
    let s = Math.round(leave3)

    this.setData({
      h:h.toString().padStart(2, '0'),
      m:m.toString().padStart(2, '0'),
      s:s.toString().padStart(2, '0')
    });

    this.countTime();
  },
  countTime() {
    let _t = this;
    clearInterval(this.data.t);
    this.data.t = setInterval(function () {
      let h = parseInt(_t.data.h);
      let m = parseInt(_t.data.m);
      let s = parseInt(_t.data.s);
      s += 1;
      if (s > 59) {
        s = 0;
        m += 1;
      }
      if (m > 59) {
        m = 0;
        h += 1;
      }
      _t.setData({
        h:h.toString().padStart(2, '0'),
        m:m.toString().padStart(2, '0'),
        s:s.toString().padStart(2, '0')
      });
    }, 1000);
  },
  beginServices(ev) {
    let { id, index} = ev.currentTarget.dataset;
    // const list = this.data.list;
    // list.forEach(function (value, index, arrSelf) {
    //   if (value.id == id) {
    //     list[index].status = 3;
    //     list[index].startTime = util.formatTime(new Date());
    //   }
    // })
    this.setData({
      [`list[${ index }].status`]: 3,
      [`list[${ index }].startTime`]: util.formatTime(new Date())
    })
    this.getServicesTime();
  }
})


