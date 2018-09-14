const productModel = require('../../../models/product/index.js');
const app = getApp();
Page({ 
  ...app.loadMoreMethods,
  data: {
    //图片地址
    imgList: [
      '/static/images/demo/b1.jpg',
      '/static/images/demo/b2.jpg',
      '/static/images/demo/b3.jpg'
    ],
    //是否采用衔接滑动  
    circular: true,
    //是否显示画板指示点  
    indicatorDots: true,
    //选中点的颜色  
    indicatorcolor: "#000",
    //是否竖直  
    vertical: false,
    //是否自动切换  
    autoplay: true,
    //自动切换的间隔
    interval: 5000,
    //滑动动画时长毫秒  
    duration: 500,
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,

    mobile: "13800138000",

    list: [], //放置返回数据的数组

    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏
  },
  onLoad: function () {
    app.pages.add(this);
    this.getList(); 
  },
  getList(request = productModel.query) {
    let _t = this;
    let params = {};
    this._getList({ request, params }, function (res) {
      console.log(res);
      var e = res.list.reverse();
      _t.setData({
        list: e,
        hasNextPage: res.hasNextPage
      });
    });
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },
  callme: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.mobile
    })
  }
})
