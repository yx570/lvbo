const orderModel = require('../../../../models/order/index.js');
const { img } = require('../../../../config/url.js');
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data: {
    list: [
      // {
      //   id: 1,
      //   imageUrl: '/static/images/demo/b1.jpg',
      //   title: '产品名称大标题',
      //   name: '王小丫1',
      //   svTimes: '100',
      //   date: '2018-05-01',
      //   star: 3,
      //   timeRange: '9:00-10:00',
      //   status: 1
      // },
      // {
      //   id: 2,
      //   imageUrl: '/static/images/demo/b1.jpg',
      //   title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
      //   name: '王小丫2',
      //   svTimes: '100',
      //   date: '2018-05-01',
      //   startTime: "2018-10-19 21:50:00",
      //   star: 3,
      //   timeRange: '9:00-10:00',
      //   h: "21",
      //   m: "50",
      //   s: "33",
      //   status: 3
      // },
      // {
      //   id: 3,
      //   imageUrl: '/static/images/demo/b1.jpg',
      //   title: '产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题产品名称大标题',
      //   name: '王小丫3',
      //   svTimes: '100',
      //   date: '2018-05-01',
      //   star: 3,
      //   timeRange: '9:00-10:00',
      //   status: 5
      // },
      // {
      //   id: 5,
      //   imageUrl: '/static/images/demo/b1.jpg',
      //   title: '产品名称大标题',
      //   svTimes: '100',
      //   name: '王小丫5',
      //   star: 3,
      //   date: '2018-05-01',
      //   timeRange: '9:00-10:00',
      //   status: 4
      // }
    ]
  },
  onLoad: function (ev) {
    let _that = this;
    let items = app.globalData.changeTechnicianItem;
    console.log(items);

    let params = {
      page: 1,
      page_size: 10,
      startServiceTime: items.start_service_time,
      endServiceTime: items.end_service_time
    };
    this._getList({
      request: orderModel.queryTecList,
      params
    }, function (res) {
      // orderModel.queryTecList({ startServiceTime: items.start_service_time, endServiceTime: items.end_service_time }).then(res => {
      res.list.forEach((v, i) => {
        v.id == items.technician_id && (v.checked = true);
        v.star = 5;
      })
      _that.setData({
        list: res.list,
        oldTecId: items.technician_id
      })
    });
    
    let pages = getCurrentPages();
    let pageUrl = pages[pages.length - 2].route;
    if (pageUrl.indexOf('tabBar') > -1) {
      app.globalData.currentOrderTab = 'wait_to_service';
    }
  },
  onShow: function () {

  },
  radioTap(ev) {
    this.setData({
      currId: ev.currentTarget.dataset.id
    })
  },
  sureSelected(ev) {
    if (!this.data.currId) {
      app.toastError('请选择技师');
    } else {
      let params = {};
      let items = app.globalData.changeTechnicianItem;
      params.technician_id = this.data.currId;
      params.schedule_id = items.id;
      params.start_time = items.start_service_time;

      orderModel.changeTime(params).then(res => {
        let pages = getCurrentPages();
        let pageUrl = pages[pages.length - 2].route;
        if (pageUrl.indexOf('tabBar') > -1) {
          app.globalData.currentOrderTab = 'wait_to_service';
          wx.switchTab({
            url: '/' + pageUrl
          })
        } else {
          wx.navigateTo({
            url: '/' + pageUrl + '?id=' + items.order_code
          })
        }
      });
    }
  }


})


