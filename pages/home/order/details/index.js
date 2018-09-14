const orderModel = require('../../../../models/order/index.js');
const commonModel = require('../../../../models/common/index.js');
Page({
  data: {
    key: 0,
    type: 0,
    types: [],
    list: [],
    checkedAll: true,
    totalPrices: 0,
    popVisible: false,
    trackingNo:'',
    skuId: '',
    keyV: '请选择物流公司',
    address:''
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      key: options.key,
      orderId: options.id,
      type: options.type,
      address: options.address
    })
    console.log(this.data.type)
    var id = this.data.orderId;
    console.log(id)
    orderModel.shippingOrderView({ id }).then(response => {
      var iArray = [];
      response.data.items.forEach((v, i) => {
        iArray[i] = v.skuId;
      });
      var a = iArray.join(",");
      this.setData({
        list: response.data,
        skuId: a
      })
      console.log(a)
      console.log(this.data.skuId)
    }).catch(error => {});

    //物流公司列表
    var name ='';
    commonModel.corpList({ name  }).then(response => {

      this.setData({
        types: response.data
      })
     
    }).catch(error => { });
  },
  bindKeywordInput: function (e) {
    this.setData({
      trackingNo: e.detail.value
    })
    
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
  //物流
  typeSelect(ev) {
    console.log(ev.currentTarget.dataset)
    let { id, value,key } = ev.currentTarget.dataset;
    this.setData({
      currentTypeId: id,
      deliveryCorp: value,
      keyV: key
    });
    this.popClose();
  },
  // 电话点击事件
  phonecallevent: function (e) {
    console.log(e.target.dataset.phone)
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
    })
  },
  // 发货
  fh: function (e) {
    this.setData({
      type: 1,
    });
  },
  //确认配送
  qrps(ev) { 
    if (this.data.deliveryCorp == undefined){
      wx.showToast({
        title: "请选择物流公司",
        icon: 'none',
        duration: 2000
      });
    } else { 
      var id = this.data.orderId,
          deliveryCorp = this.data.deliveryCorp,
          trackingNo = this.data.trackingNo,
          skuIds = this.data.skuId,
          params = {};
      params = { id, deliveryCorp, skuIds };
      deliveryCorp !== 'SJPS' && (params['trackingNo'] = trackingNo);
      orderModel.orderShipping(params).then(response => {
        wx.navigateTo({
          url: '../../../work/order/index?tab=2'
        });
        wx.showToast({
          title: "已配送",
          icon: 'none',
          duration: 2000
        });
      }).catch(error => {
        wx.showModal({
          content: "" + error.data.msg + "",
          showCancel:false,
          confirmColor: "#ff5100",
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../../../tabBar/purchase/index'
              });
            } 
          }
        })
      });
    }
  },
  skuContentText:function(e){
    let data = e.currentTarget.dataset.skucontent
    if(data){
      wx.showToast({
        title: data,
        icon: 'none',
        duration: 2000
      })
    }
  }
})