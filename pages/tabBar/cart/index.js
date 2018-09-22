const cartModel = require('../../../models/cart/index.js');
const app  = getApp();
Page({
  data:{
    orders:[],
    checkedAll:false,
    totalPrices:0,
    startX: 0, 
    startY: 0,
    curTouchIndex:0,
    selectQuantity:0,
    // 表示该篇文章
    item: [],
    id:[],
    selected:false,
  },
  onLoad: function () {
    app.pages.add(this);

    // xwx.showTabBarRedDot(2);

    this.data.orders.forEach((v,i)=>{
      v.isTouchMove = false;
    });
  },
  onShow: function () {
    this.getList();
  },
  changeBadge(count){
    if (count <= 0){
      wx.removeTabBarBadge({
        index: 2
      })
    }else{
      // 总数
      wx.setTabBarBadge({
        index: 2,
        text: String(this.data.selectQuantity + count)
      });
      this.setData({
        selectQuantity: this.data.selectQuantity + count
      });
    }
    
  },
  // 获取列表
  getList: function () {
    cartModel.cartlist().then(response => {
      let { list = [], quantity = 0 } = response.data;
      list.forEach(v=>{
        v.isTouchMove = false;
        v.checked = false ;
      });
      this.setData({
        orders: list,
        selectQuantity: 0
      });
      var e = list.length;
      this.changeBadge(e);
      this.checkShow();
      this.computeTotalPrice();
    }).catch(error => {});
  },

  // 去结算
  goSettle(params){
    var datas = this.data.orders.filter(item => {
      return item.selected == true;
    });
    this.setData({
      item: datas
    });
    // console.log(datas.length)
    if (datas.length != 0) {
      getApp().globalData.goSettleList = datas;
      // console.log(getApp().globalData.goSettleList)
      wx.navigateTo({
        url: '../../../pages/cart/fill/index?payType=2&&type=2'
        })
    } else {
      wx.showToast({
        title: "请至少选择一件商品提交",
        icon: 'none',
        duration: 2000
      });
    }
   
  },
  // 单选
  checkboxTap(e){
    let { index, sele , ids } = e.currentTarget.dataset;
   
    if (sele == false){
      this.setData({
        selected: true,
        [`orders[${index}].selected`]: true
      });
    }else{
      this.setData({
        selected: false,
        [`orders[${index}].selected`]: false
      });
    }
    // console.log(sele)
    //更改选中状态
    // console.log(ids, this.data.selected )
    let selected =this.data.selected;
    cartModel.cart_select({ ids, selected }).then(response => { console.log(response) }).catch(e => { });
    this.computeTotalPrice();
    this.checkShow();
  },
  checkShow(){
    var datas = this.data.orders.filter(item => {
      return item.selected == false;
    });
    // console.log(this.data.orders)
    // console.log(datas.length)
    if (datas.length == 0){
      this.setData({
        checkedAll: true
      });
    }else{
      this.setData({
        checkedAll: false
      });
    }
  },
  // 全选
  checkAllTap(){
    // let self = this;
    this.setData({
      checkedAll: !this.data.checkedAll
    });
    this.data.id = [];
    this.data.orders.forEach(v => {
      v.selected = this.data.checkedAll;
      this.data.id.push(v.id)
    });
    this.setData({
      orders: this.data.orders
    });
    //更改选中状态
    let ids = this.data.id;
    let selected = this.data.checkedAll;
    // console.log(ids, selected)
    cartModel.cart_select({ ids, selected }).then(response => { console.log(response) }).catch(e => { });
    this.computeTotalPrice();
  },
  inputTap(){},
  // 改变商品数量
  changeCount(e){
    let self = this;
    let { value } = e.detail;
    let { id, index } = e.currentTarget.dataset;
    // console.log(value);
    this.setData({
      [`orders[${index}].quantity`]: value,
      [`orders[${index}].checked`]: this.data.orders[index].checked ? Boolean(value) : false 
    });
    this.computeTotalPrice();
   
    //更改数量
    cartModel.change_quantity({ id, quantity: value }).then(response => {}).catch(e => { });
  },
  // 计算总价
  computeTotalPrice(){
    // console.log(this.data.orders);
    let total = 0;
    this.data.orders.forEach((v,i)=>{
      v.selected && (total += v.price * v.quantity);
    });
    this.setData({
      totalPrices:total.toFixed(2)
    });
  },
  initList(e){
    this.data.orders.forEach( v => {
      v.isTouchMove = false;
    });
    this.setData({
      orders: this.data.orders
    });
  },
  cellTap(e){
    this.initList(e);
  },
  cellBtnTap(e){
    let { id,num } = e.currentTarget.dataset;
    cartModel.remove({ id }).then(response=>{
      this.setData({
        orders: this.data.orders.filter(v=>{
          return v.id !== id
        })
      });
      if (this.data.orders.length == 0){
        this.setData({
          checkedAll: false
        });
      }
      // console.log(this.data.orders.length)
      if (this.data.orders.length <= 0){
        this.changeBadge(0);
      } else {
        this.setData({
          selectQuantity: 0
        });
        this.changeBadge(this.data.orders.length);
      }
      this.computeTotalPrice();
    }).catch(e=>{});
  },
  // 手指触摸动作开始 记录起点X坐标
  touchstart(e) {
    // 开始触摸时 重置所有
    if (this.data.curTouchIndex !== e.currentTarget.dataset.index){
      this.initList(e);
    }
    this.setData({
      curTouchIndex: e.currentTarget.dataset.index,
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY
    });
  },
  // 滑动事件处理
  touchmove(e) {
    var that = this,
    index = e.currentTarget.dataset.index,    //当前索引
    startX = that.data.startX,                //开始X坐标
    startY = that.data.startY,                //开始Y坐标
    touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
    touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
    //获取滑动角度
    angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.orders.forEach(function (v, i) {
      v.isTouchMove = false;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30){
        return;
      } 
      if (i == index) {
        if (touchMoveX - startX > 20){
          // 右滑
          v.isTouchMove = false;
          v.isConfirm = false;
          v.operateType = 0;
        } else if(touchMoveX - startX < -20){
          // 左滑
          v.isTouchMove = true;
        }
          
      }
    })
    //更新数据
    that.setData({
      orders: that.data.orders
    });
    // console.log(that.data.orders);
  },
  // 滑动角度
  angle(start, end) {
    var _X = end.X - start.X,
    _Y = end.Y - start.Y
    // 返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //详情
  urlshow (e) {
    // console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../../purchase/details/details?id=' + e.currentTarget.dataset.id
    })
  },
  changeTimes() {
  }
})