const orderModel = require('../../../models/order/index.js');
const util = require('../../../utils/utils.js');
const app = getApp();
Page({
  // ...app.loadcartlist,
  data: {
    statusFormat: {
      // 1: "已服务",
      // 2: "技师已出发",
      // 5: "技师已到达",
      // 3: "服务中",
      // 4: "待服务"
        "finish": "已服务",
        "in_service": "服务中",
        "wait_to_service": "待服务"
    },
    orderInfos: {
      number: '201809192020',
      imageUrl: '/static/images/demo/b1.jpg',
      title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
      total: 3,
      status: 'finish',
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
        startTime: "2018-10-19 21:50:00",
        h: "21",
        m: "50",
        s: "33",
        status: 'in_service'
      },
      {
        id: 2,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
        name: '王小丫2',
        date: '2018-05-01',
        star: 3,
        timeRange: '9:00-10:00',
        status: 'finish'
      },
      {
        id: 3,
        imageUrl: '/static/images/demo/b1.jpg',
        title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
        name: '王小丫3',
        date: '2018-05-01',
        star: 3,
        timeRange: '9:00-10:00',
        status: 'wait_to_service'
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
  onLoad () {
  },
  onShow() {
    // this.getOrder();
    this.getServicesTime();
  },
  getServicesTime() {
      let startTime
      let _this = this;
      this.data.list.forEach(function (value, index, arrSelf) {
          if (value.status == 'in_service') {
              let now = util.formatTime(new Date());

              value.startTime = value.startTime || now;
              
              startTime = value.startTime.replace(/-/g, '/');
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

              _this.setData({
                [`list[${index}].h`]: h.toString().padStart(2, '0'),
                [`list[${index}].m`]: m.toString().padStart(2, '0'),
                [`list[${index}].s`]: s.toString().padStart(2, '0')
              });
              _this.countTime(index, value);
          }
      })
  },
  countTime(index, value) {
      let _t = this;
      clearInterval(this.data.list[index].t);
      this.data.list[index].t = setInterval(function () {
          let h = parseInt(value.h);
          let m = parseInt(value.m);
          let s = parseInt(value.s);
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
            [`list[${index}].h`]: h.toString().padStart(2, '0'),
            [`list[${index}].m`]: m.toString().padStart(2, '0'),
            [`list[${index}].s`]: s.toString().padStart(2, '0')
          });
      }, 1000);
  },
  beginServices(ev) {
      let { id, index } = ev.currentTarget.dataset;
      let now = new Date();
      let h = now.getHours();
      let m = now.getMonth() + 1;
      let s = now.getSeconds();
      this.setData({
          [`list[${index}].status`]: 3,
          [`list[${index}].startTime`]: util.formatTime(new Date()),
          [`list[${index}].h`]: h.toString().padStart(2, '0'),
          [`list[${index}].m`]: m.toString().padStart(2, '0'),
          [`list[${index}].s`]: s.toString().padStart(2, '0')
      })
      this.getServicesTime();
  },
  stopServices(ev) {
    let { index } = ev.currentTarget.dataset;
    this.setData({
        [`list[${index}].status`]: 1,
    })
  }
})


