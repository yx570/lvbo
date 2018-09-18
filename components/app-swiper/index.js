// components/app-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgList: {         // 属性名
      type: Array,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: []        // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    showNumber: {      // 是否显示自定义右下角数字
      type: Boolean,
      value: false
    },
    indicatorDots: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //是否采用衔接滑动  
    circular: true,
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
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})
