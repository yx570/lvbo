// components/app-previewImage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgList: {
      type: Array,
      value: []
    },
    success: {
      type: null
    },
    fail: {
      type: null
    },
    complete: {
      type: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    prevImg () {
      let params = {
        urls: this.properties.imgList,
        success: this.properties.success,
        fail: this.properties.fail,
        complete: this.properties.complete
      };
      wx.previewImage(params);
    }
  }
})
