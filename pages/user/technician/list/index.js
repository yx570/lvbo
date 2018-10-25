const orderModel = require('../../../../models/order/index.js');
const util = require('../../../../utils/utils.js');
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
    listDone: [], 
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
    
  },
  getMeasureTime() {
    let startTime;
    let _this = this;
    this.data.list.forEach(function (value, index, arrSelf) {
      if (value.status == 4) {
        let now = util.formatTime(new Date());

        value.startTime = value.startTime || now;
        console.log(value.startTime);
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
  beginMeasure(ev) {
    let { id, index } = ev.currentTarget.dataset;
    let now = new Date();
    let h = now.getHours();
    let m = now.getMonth() + 1;
    let s = now.getSeconds();
    this.setData({
      [`list[${index}].status`]: 4,
      [`list[${index}].startTime`]: util.formatTime(new Date()),
      [`list[${index}].h`]: h.toString().padStart(2, '0'),
      [`list[${index}].m`]: m.toString().padStart(2, '0'),
      [`list[${index}].s`]: s.toString().padStart(2, '0')
    })
    this.getMeasureTime();
  },
  stopMeasure(ev) {
    let { index, row } = ev.currentTarget.dataset;
    clearInterval(this.data.list[index].t);
    this.setData({
      [`list[${index}].status`]: 5
    })
  }
})


