const orderModel = require('../../../models/order/index.js');
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data: {
    calendar: [],
    currentIndex: 0
  },

  onLoad: function (ev) {
    this.setData({
      id: ev.id
    })
    this.initCanladar(30);
  },

  loadList(date, request = orderModel.queryTimeList) {
    let _t = this;
    let params = {};
    params.id = this.data.id;
    params.date = date;
    this._getList({ request, params }, function (res) {
      _t.setData({
        list: res.list,
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
      if (date == cur_date) {
        this.week = "今天";
      } else {
        this.week = week;
      }
    }

    function countDays(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + Number(AddDayCount));
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;
      var d = dd.getDate();
      return y + '-' + m + '-' + d;
    }

    //当前月份的天数
    let monthLength = getThisMonthDays(cur_year, cur_month)
    let nextMonthLength = getThisMonthDays(cur_year, cur_month + 1);
    let twoMonthLength = monthLength + nextMonthLength;
    //当前月份的第一天是星期几
    let week = getFirstDayOfWeek(cur_year, cur_month)
    let x = week;
    for (let i = 1; i <= days + cur_date; i++) {

      //当循环完一周后，初始化再次循环
      if (x > 6) {
        x = 0;
      }
      let fullDate = countDays(i);
      let date = fullDate.split('-')[2];
      //利用构造函数创建对象
      that.data.calendar[i] = new calendar(date, [weeks_ch[x]][0], fullDate)
      x++;
    }
    //限制要渲染的日历数据天数为7天以内（用户体验）
    let flag = that.data.calendar.splice(cur_date, days)

    var today = cur_year + '-' + cur_month + '-' + cur_date;
    this.loadList(today);

    that.setData({
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
    let time = ev.currentTarget.dataset.time;
    let id = this.data.id;
    let pages = getCurrentPages();
    let pageUrl = pages[pages.length - 2].route;
    console.log('this:' + pageUrl)
    wx.navigateTo({
      url: '/' + pageUrl
    })
  }

})


