const app = getApp()
Page({
  data: {
    popVisible: false,
    cameraVisible: false,
    images: [
      '/static/images/demo/b1.jpg',
      '/static/images/demo/b2.jpg'
    ]
  },
  onLoad() {
    app.setNavTitle('')
    app.setNavColor()
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  preViewImage(e){
    let current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.images
    });
  },
  chooseImage(){
    this.setData({
      popVisible: true
    })
  },
  popClose(){
    this.setData({
      popVisible: false
    })
  },
  openCamera(){
    this.setData({
      cameraVisible: true
    })
    this.popClose();
  },
  cameraSuccess(image){
    console.log(image)
  },
  closeCamera() {
    this.setData({
      cameraVisible: false
    })
  }
})