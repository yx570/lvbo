const authModel = require('../../../models/order/index.js'); 
const cartModel = require('../../../models/cart/index.js');
const app = getApp();
Page({
  ...app.loadcartlist,
  data: {
    content:'',
    form: {
      id: '',
      quantity: ''
    },
    id: '',
    num: 1,
    minusStatus: 'disable',
    slider: [], //轮播
    detailsList: '',//详情
    attributes: '',//参数
    popVisible: false,
    popType: 1,
    currentTypeId: 1,
    //  types: [
    //   {
    //     id: 1,
    //     text: '广东省深圳市宝安中粮商务中心'
    //   },
    //   {
    //     id: 2,
    //     text: '广东省深圳市宝安中粮商务中心'
    //   }
    //  ],
    state: [
      {
        id: 1,
        text: '200g x 2盒/提'
      },
      {
        id: 2,
        text: '300g x 2盒/提'
      }
    ], 
    swiperCurrent: 0,
    catlist:0
  },

  // 详情加载
  onLoad: function (ev) {
    var WxParse = require('../../../wxParse/wxParse.js');
    // var id = '5528_20141_28502'; 
    var id = ev.id;
    // console.log(ev.id)
    authModel.detail({ id }).then(response => {
      // console.log(response.data);
      this.setData({
        id: response.data.id,
        slider: response.data.carousel,
        attributes: response.data.attributes,
        detailsList: response.data,
      })
      this.onChang(ev.id);
      content: WxParse.wxParse('content', 'html', response.data.description, this, 10)
    }).catch(error => {});
  },
  //轮播
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  //规格选择
  stateSelect(ev) {
    let { id } = ev.currentTarget.dataset;
    this.setData({
      currentTypeId: id
    });
  },
  //弹窗
  selectTap(ev) {
    var key = ev.currentTarget.dataset.num;
    this.setData({
      popType: key,
      popVisible: true
    });
  },
  popClose(ev) {
    this.setData({
      popVisible: false
    });
  },
  //地址
  typeSelect(ev) {
    let { id } = ev.currentTarget.dataset;
    this.setData({
      currentTypeId: id
    });
    this.popClose();
  },
  //事件处理函数
  /*点击减号*/
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*输入框事件*/
  bindManual: function (e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  // 购物车
   shoppingCart: function () {
     wx.switchTab({
       url: '../../tabBar/cart/index',
     })
  }, 
  // 立即购买
  shopping: function (e) {
    this.setData({
      List: [
        {
          name: this.data.detailsList.name,
          picture: this.data.detailsList.picture,
          price: this.data.detailsList.price,
          quantity: 1,
        }
      ], 
    }) 
    getApp().globalData.goSettleList = this.data.List;
    var id = this.data.detailsList.id;
    var quantity = '1';
    cartModel.cartbuy({ id, quantity }).then(response => {
      console.log(response);
      wx.navigateTo({
        url: '../../cart/fill/index?payType=2'
      })
    }).catch(error => {});
    
   }, 
   // 加入购物车
  submitCart: function (ev) {
    let { quantity, id} = ev.detail.value;
      cartModel.additem({ id, quantity }).then(response => {
       console.log(response);
        wx.showToast({
         title: "添加成功",
         icon: "none",
         duration: 2000
       });
        this.setData({
          popVisible: false,
          catlist: 1
        });
        this.onChang(id);
        this._cartlist(0, 1);
     }).catch(error => {
       console.log('error!!!');
       console.log(error);
       wx.showToast({
         title: error.data.msg,
         icon: "none",
         duration: 2000
       });
       this.setData({
         popVisible: false
       });
     });
   }, 
   onChang(e){
    var a = getApp().globalData.catList;
     console.log(a)
     console.log(e)
    var datas = a.filter(item => {
      return item == e;
    });
     if (datas.length == 1){
      this.setData({
        catlist: 1
      });
    }
   }
})


