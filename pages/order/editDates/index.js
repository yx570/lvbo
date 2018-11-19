const orderModel = require('../../../models/order/index.js');
const { img } = require('../../../config/url.js');
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data: {
    calendar: [],
    currentIndex: 0,
    project: [],
    currentId: '',
    currentTime: ''
  },

  onLoad: function (ev) {
    let order = app.globalData.changeTimeOrder;
    let items = app.globalData.changeTimeItem;
    if (order && JSON.stringify(order) != '{}') {
      let project = [];
      order.orderProductList.forEach((v, i) => {
        let item = {};
        item.name = v.product_name;
        item.id = v.productServiceSchedule[0].id;
        item.times = v.productServiceSchedule[0].start_service_time;
        let now = new Date().getTime();
        let svTime = v.productServiceSchedule[0].start_service_time.replace(/-/g, '/');
        let startTime = new Date(svTime).getTime();
        let svLong = (startTime - now) / 1000 / 60 / 60;
        if (order.order_status == 'wait_to_pay' || (svLong > 24)) {
          project.push(item);
        }
      });
      this.setData({
        order: order,
        project: project,
        currentId: project[0].id,
        currentTime: project[0].times
      })
    } else {
      this.setData({
        items: items,
        currentId: items.id,
        currentTime: items.start_service_time
      })
    }
    this.initCanladar(30);
  },

  reLoadOrder(cb) {
    let _that = this;
    orderModel.orderlist({ order_code: this.data.order.order_code }).then(res => {
      res.dataList.orderList.forEach((v, i) => {
        let pro = v.orderProductList[0]
        v.imgUrl = img + pro.product_template_image[0]
        v.defaultCombo = pro.orderProductSkuList[0]
        v.productName = pro.product_name
        v.quantity = pro.orderProductSkuList[0].sku_buy_num
        v.id = v.order_code

        let arr = [];
        v.orderProductList.forEach((v2, i2) => {
          if (v2.productServiceSchedule && v2.productServiceSchedule.length > 0) {
            v2.productServiceSchedule.forEach((v3, i3) => {
              arr.push(v3.start_service_time);
            });
          }
        });
        v.bookingDates = arr.join('，');
      });
      let order = res.dataList.orderList[0];

      let project = [];
      res.dataList.orderList[0].orderProductList.forEach((v, i) => {
        let item = {};
        item.name = v.product_name;
        item.id = v.productServiceSchedule[0].id;
        item.times = v.productServiceSchedule[0].start_service_time;
        let now = new Date().getTime();
        let svTime = v.productServiceSchedule[0].start_service_time.replace(/-/g, '/');
        let startTime = new Date(svTime).getTime();
        let svLong = (startTime - now) / 1000 / 60 / 60;
        if (order.order_status == 'wait_to_pay' || (svLong > 24)) {
          project.push(item);
        }
      });
      this.setData({
        order: order,
        project: project,
        currentId: _that.data.currentId,
        currentTime: _that.data.currentTime
      })
      cb && cb();
    });
  },

  loadList(date) {
    let _t = this;
    let params = {};
    params.schedule_id = this.data.currentId;
    params.check_date = date;
    orderModel.queryTimeList(params).then(res => {
      let list = res.dataList.timeArea;
      list.forEach((v, i) => {
        v.id = i;
        v.startTime = v.startServiceTime.split(' ')[1]
        v.endTime = v.endServiceTime.split(' ')[1]
      });
      _t.setData({
        list: list,
        hasNextPage: !res.hasNextPage
      });
    });
  },

  initCanladar(days) {
    let that = this;
    function getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    }
    // 计算每月第一天是星期几
    function getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    }
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_date = date.getDate();
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    //利用构造函数创建对象
    function calendar(date, week, fullDate) {
      this.date = date;
      this.fullDate = fullDate;
      this.week = week;
    }

    function countDays(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + Number(AddDayCount));
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      return y + '-' + m + '-' + d;
    }

    //当前月份的第一天是星期几
    let week = getFirstDayOfWeek(cur_year, cur_month)
    let x = week;
    for (let i = 1; i <= days + cur_date; i++) {

      //当循环完一周后，初始化再次循环
      if (x > 6) {
        x = 0;
      }
      let fullDate = countDays(i);
      that.data.calendar[fullDate]
      let date = fullDate.split('-')[2];
      //利用构造函数创建对象
      that.data.calendar[i] = new calendar(date, [weeks_ch[x]][0], fullDate)
      x++;
    }
    //限制要渲染的日历数据天数为7天以内（用户体验）
    let flag = that.data.calendar.splice(1, days)

    var today = cur_year + '-' + cur_month + '-' + cur_date;
    this.loadList(flag[0].fullDate);

    that.setData({
      date: flag[0].fullDate,
      calendar: flag
    })
  },
  select(ev) {
    let { index, date } = ev.currentTarget.dataset;
    this.loadList(date);
    this.setData({
      currentIndex: index,
      date: date
    })
  },
  selectTime(ev) {
    let _that = this;
    let time = ev.currentTarget.dataset.time;
    let id = this.data.currentId;
    let pages = getCurrentPages();
    let pageUrl = pages[pages.length - 2].route;

    this.setData({
      currentTime: time
    });

    let params = {};
    params.schedule_id = id;
    params.start_time = time;
    orderModel.changeTime(params).then(res => {
      if (_that.data.project.length > 1) {
        app.toastSuccess('预约成功');
        _that.reLoadOrder(function () {
          _that.loadList(_that.data.date);
        })
      } else {
        if (pageUrl.indexOf('tabBar') > -1) {
          app.globalData.currentOrderTab = 'wait_to_service';
          wx.switchTab({
            url: '/' + pageUrl
          })
        } else {
          wx.navigateTo({
            url: '/' + pageUrl + '?id=' + app.globalData.changeTimeOrder.order_code
          })
        }
      }
    });
  },
  selectProject(ev) {
    let id = ev.currentTarget.dataset.id;
    let [pro] = this.data.project.filter(v => {
      return id == v.id;
    })
    this.setData({
      currentId: ev.currentTarget.dataset.id,
      currentTime: pro.times
    })
    this.loadList(this.data.date);
  }

})


