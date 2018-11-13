const orderModel = require('../../../models/order/index.js');
const util = require('../../../utils/utils.js');
const { img } = require('../../../config/url.js');
const app = getApp();
Page({ 
  ...app.loadcartlist,
  ...app.loadMoreMethods,
  data: {
    tabs: [
      {
        key: '0',
        label: '全部'
      }, 
      {
        key: 'wait_to_pay',
        label: '待付款'
      },
      {
        key: 'wait_to_service',
        label: '待服务'
      },
      {
        key: 'finish',
        label: '已完成'
      }
    ],
    curTab: '0',
    list: [], 
    hasNextPage: false,
    statusFormat: {
      2: "技师已出发",
      "technician_arrive": "技师已到达",
      "in_service": "服务中",
      "finish": "已完成",
      "wait_to_pay": "待付款",
      "wait_to_service": "待服务"
    },
    userPage: null
  },
  //load
  onLoad (e) {
    this.getList();
  },
  onShow () {
    this.setData({
      curTab: app.globalData.currentOrderTab
    })
    if (this.data.curTab == 2) {
      this.getServicesTime();
    }
  },
  onHide(){
    
  },
  getList () {
    let _t = this;
    let status = _t.data.curTab == 0 ? '' : _t.data.curTab;
    let params = {
      page: 1,
      page_size: 10,
      order_status: status
    };
    this._getList({
      request: orderModel.orderlist,
      params
    }, function (res) {
      console.log('response:')
      console.log(res);
      res.list.forEach((v,i) => {
        v.orderProductList.forEach((v2,i2) => {
          v2.imgUrl = img + v2.product_template_image[0];
          let combo = v2.orderProductSkuList[0];
          combo.price = (combo.sku_price * combo.sku_service_time).toFixed(2);
          v2.combo = combo;
        });
      });
      console.log(res.list);
      _t.setData({
        list: res.list,
        hasNextPage: !res.hasNextPage
      });
    });  
  },

  //加入购物车
  setTabBarBadge (e) {
    var id = e.currentTarget.dataset.id;
    var quantity =1;
    cartModel.additem({ id, quantity }).then(response => {
      this._cartlist(0, 1);
      wx.showToast({
        title: "添加成功",
        icon: "none",
        duration: 2000
      });
    }).catch(error => {
      wx.showToast({
        title: error.data.msg,
        icon: "none",
        duration: 2000
      });
    });
  },
  tabChange(e) {
    let { key } = e.detail;
    app.globalData.currentOrderTab = key;
    this.setData({
      curTab: key
    })
    if (this.data.curTab == 2) {
      this.getServicesTime();
    } else {
      this.getList();
    }
  },
  gotoComment(ev) {
    let id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/user/score/list/index?id=' + id
    });
  },
  gotoPay(ev) {
    let id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../order/buyNow/index?id=' + id
    });
  },
  getServicesTime() {
      let startTime
      let _this = this;
      this.data.list.forEach(function (value, index, arrSelf) {
          if (value.status == 3) {
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


