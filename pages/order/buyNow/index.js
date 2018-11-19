const orderModel = require('../../../models/order/index.js');
const app = getApp();
const { img } = require('../../../config/url.js');
Page({
  // ...app.loadcartlist,
  data: {
    orders: [],
    totalPrices: '',
    userInfo: null,
    id: null,
    address: '',
    useCoin: false,
    popVisible: false
  },

  // 详情加载
  onLoad: function (ev) {
    app.setNavColor()

    let userInfo = app.globalData.userInfo || {};
    let address = userInfo.user_real_province + userInfo.user_real_city + userInfo.user_real_district + userInfo.user_locate_detail_addr + userInfo.user_real_detail_addr;
    this.setData({
      id: ev.id,
      userInfo: userInfo,
      address: address
    });
  },
  onShow() {
    this.getOrder();
  },
  // 获取列表
  getOrder() {
    let _that = this;
    orderModel.orderlist({ order_code: this.data.id }).then(res => {
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

      _that.setData({
        orders: res.dataList.orderList
      });
      _that.computeTotalPrice();
    });
  },
  inputTap() { },
  // 改变商品数量
  changeCount(e) {
    let self = this;
    let { value } = e.detail;
    let { id, index, skuname } = e.currentTarget.dataset;
    // console.log(value);
    this.setData({
      [`orders[${index}].quantity`]: value,
      [`orders[${index}].checked`]: this.data.orders[index].checked ? Boolean(value) : false
    });
    this.computeTotalPrice();
  },
  // 计算总价
  computeTotalPrice() {
    // console.log(this.data.orders);
    let total = 0;
    this.data.orders.forEach((v, i) => {
      total += v.defaultCombo.sku_price * v.quantity
    });
    this.setData({
      totalPrices: total.toFixed(2)
    });
  },
  //详情
  urlshow(e) {
    // console.log(e.currentTarget.dataset.id)
    // url: '../../purchase/details/details?id=' + e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../product/details/index?id=' + e.currentTarget.dataset.id
    })
  },
  //选择时间
  selectTimeTap(e) {
    let [rs] = this.data.orders.filter(v => {
      return v.order_code == e.currentTarget.dataset.id
    })
    app.globalData.changeTimeOrder = rs;
    wx.navigateTo({
      url: '../../order/editDates/index'
    })
  },
  goSettle() {
    let _that = this;
    orderModel.sign({ order_code: this.data.id }).then(res => {
      let opts = res.dataList;
      opts.timeStamp = opts.timeStamp.toString();
      opts.success = function () {
        app.toastSuccess({
          title: "支付成功",
          icon: 'none',
          duration: 2000
        });
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/tabBar/order/index'
          });
          app.globalData.currentOrderTab = 'wait_to_service';
        }, 1000);
      };
      opts.fail = function () {
        app.toastError({
          title: "支付失败",
          icon: 'none',
          duration: 2000
        });
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/tabBar/order/index'
          });
          app.globalData.currentOrderTab = 'wait_to_pay';
        }, 1000);
      }
      wx.requestPayment(opts);
    });
  },
  isUseCoin(ev) {
    this.setData({
      useCoin: ev.detail.value
    })
  },
  inputBlur(ev) {
    console.log(ev.detail.value);
  },
  //弹窗
  selectTap(ev) {
    this.setData({
      popVisible: true
    });
  },
  popClose(ev) {
    this.setData({
      popVisible: false
    });
  },
})


