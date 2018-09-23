Component({
  externalClasses: [
    'iconfont',
    'icon-arrow-down',
    'icon-camera-reverse'
  ],
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    quality: {
      type: String,
      value: 'high'
    }
  },
  data: {
    position: 'back'
  },
  ready(){
    
  },
  methods:{
    takePhoto(){
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: this.data.quality,
        success: (res) => {
          this.triggerEvent('success', res.tempImagePath);
        }
      })
    },
    reverseCamera(){
      if (this.data.position == 'back'){
        this.setData({
          position: 'front'
        })
      }else{
        this.setData({
          position: 'back'
        })
      }
    },
    cancel(){
      this.setData({
        visible: false
      })
      this.triggerEvent('cancel', false);
    },
    error(e) {
      this.triggerEvent('error', e.detail);
    }
  }
})