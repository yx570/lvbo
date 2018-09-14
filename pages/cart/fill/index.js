const payModel = require('../../../models/pay/index.js');
const cartModel = require('../../../models/cart/index.js');
const addressModel = require('../../../models/user/address/index.js');
const app = getApp();
Page({
  data:{
    orderId: undefined,
    address:{},
    Freight:'0.00',//运费
    totalPrices:'',//总金额
    payTypes:'',//判断那个页面进入提交
    detailsList:[],
    popVisible: false,
    popType:1,
    popContents:{
      1:[
        {
          id: 1,
          text: '不限送货时间'
        },
        {
          id: 2,
          text: '工作日送货'
        },
        {
          id: 3,
          text: '节假日'
        }
      ],
      2:[
        {
          id: 1,
          text: '在线支付'
        },
        // {
        //   id: 2,
        //   text: '线下支付'
        // }
      ],
      3:[
        {
          id: 1,
          text: '个人'
        },
        {
          id: 2,
          text: '公司'
        }
      ]
    },
    popCurrentContent:{
      1:{
        id: 1,
        text: '不限送货时间'
      },
      2: {
        id: 1,
        text: '在线支付'
      },
      3: {
        id: 1,
        text: '个人'
      }
    },
    orders:[],
    orderslist: [],
    payVisible: false,
    type:'',
    addressType:'',
    addressText:'',
    addType:1,
    addressidType: '',
    method: '',
    title: '',
    receiverId: '',
  },
  onLoad(options){
    let { type, orderId } = options;
    // this.setData({
    //   orderId: orderId
    // })
    console.log(options)
    getApp().globalData.orderId = orderId;
    if (type == 3 ) {
      this.setData({
          orderslist: getApp().globalData.goSettleList1,
          payTypes: 3,
          type: 3,
          orderId: orderId
      })
      console.log(this.data.orderslist)
      this.computeTotalPrice(this.data.orderslist); 
    } else if (type == 1){
      console.log(orderId)
      payModel.rebuild({ orderId }).then(response => {
        this.setData({
          orderslist: response.data.items,
          payTypes: 3,
          type: 3,
          // orderId: undefined
        })
        this.computeTotalPrice(response.data.items);
      }).catch(e => { });
    }else{
       this.setData({
         orders: getApp().globalData.goSettleList,
         payTypes: options.payType
       })
       console.log(1)
      console.log(getApp().globalData.goSettleList)
      this.computeTotalPrice(getApp().globalData.goSettleList);
    }
  },
  onShow(){
    this.getAddress();
  },
  // 计算总价
  computeTotalPrice(e) {
    console.log(e)
    if(this.data.payTypes == 1){
      let total = 0;
      e.forEach((v, i) => {
        var a = v.items;
        a.forEach((v, i) => {
          total += v.price * v.quantity;
        });
      });
      this.setData({
        totalPrices: total.toFixed(2)
      });
   }else{
     let total = 0;
     e.forEach((v, i) => {
       total += v.price * v.quantity;
     });
     this.setData({
       totalPrices: total.toFixed(2)
     });
   }
  },

  //提交订单
  submitOrder(ev) {
    let { method, title, receiverId} = ev.detail.value;
    if (receiverId < 0 || this.data.addressidType == 1){
      wx.showToast({
        title: "收货地址不能为空",
        icon: "none",
        duration: 2000
      });
    }else{
      if (this.data.orderId == undefined || this.data.type != 3){
        console.log("创建订单")
        console.log(method, receiverId)
        //创建订单
        payModel.create({ method , receiverId }).then(response => {
          let orderId= response.data.id;
          payModel.payment({ orderId }).then(response => {
            this.setData({
              orderId: response.data.id,
              payVisible: true
            });
          });
        });
      } else  {
        console.log("已有订单")
        this.setData({
          payVisible: true
        });
      }
    }
  },
  payPopClose(){
    this.setData({
      payVisible: false
    });
  },
  payPopSuccess(ev) {
    console.log('success');
    this.payPopClose();
  },
  //获取地址
  getAddress(){
    var addressPage = getApp().globalData.selectRow;
    var selectRowType = getApp().globalData.selectRowType;
    if ( selectRowType == 1 ){
      this.setData({
        addressText: '',
        address: addressPage,
        addType: 1,
        addressidType: 2
      });
    } else {
      addressModel.list().then(response => {
        var data = response.data.filter(item => { return item.isDefault == true; });
        if (data.length != 0) {
          this.setData({
            addressText: '',
            address: data,
            addType: 2,
            addressidType: 2
          });
        } else {
          this.setData({
            addressText: '请选择收货地址',
            addressidType:1
          });
        }
      }).catch(e => { });
    }
    console.log(this.data.address)
  },
  // 去选择收货地址
  goSelectAddress(ev) {
    let { id } = ev.currentTarget.dataset;
    wx.navigateTo({
      url: `../../../pages/user/address/index/index?id=${id}&&ress=3`
    })
  },
  // 弹窗
  selectTap(ev) {
    var key = ev.currentTarget.dataset.num;
    this.setData({
      popType: Number(key),
      popVisible: true
    });
  },
  // 关闭弹出
  popClose(ev) {
    this.setData({
      popVisible: false
    });
  },
  // 选择
  typeSelect(ev) {
    let { row } = ev.currentTarget.dataset;
    this.setData({
      [`popCurrentContent.${this.data.popType}`]: row
    });
  }
})