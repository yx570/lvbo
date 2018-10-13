const app = getApp()
Page({
  data: {
    popVisible: false,
    images: [
      'http://cms-bucket.nosdn.127.net/catchpic/3/38/38e204a37a7460b3b56eb198e7e1492a.jpg?imageView&thumbnail=550x0',
      'http://p6.qhimg.com/t01b95ebc4d963ef400.jpg'
    ],
    maxImageCount: 6,
    team: [
      {
        src: '/static/images/demo/liushishi.jpg',
        name: '刘诗诗',
        star: 5
      },
      {
        src: '/static/images/demo/tangyan.jpg',
        name: '唐嫣',
        star: 3
      },
      {
        src: '/static/images/demo/shuqi.jpg',
        name: '舒淇',
        star: 4
      },
      {
        src: '/static/images/demo/tangyan.jpg',
        name: '唐嫣',
        star: 3
      },
      {
        src: '/static/images/demo/shuqi.jpg',
        name: '舒淇',
        star: 4
      }
    ],
    swiperIndex: 0,
    cases: [
      {
        src: '/static/images/demo/b1.jpg',
        name: 'Amy妈妈',
        country: '新加坡',
        content: '服务周到客户至上是我是疲惫的您可以联系我会所上门服务。'
      },
      {
        src: '/static/images/demo/b2.jpg',
        name: 'kell妈妈',
        country: '新加坡',
        content: '服务周到客户至上是我是疲惫的您可以联系我会所上门服务。'
      },
      {
        src: '/static/images/demo/b3.jpg',
        name: 'Amy妈妈',
        country: '新加坡',
        content: '服务周到客户至上是我是疲惫的您可以联系我会所上门服务。'
      }
    ],
    caseBgClass: ['bg-pink', 'bg-primary', 'bg-warm']
  },
  onLoad() {
    app.setNavTitle('')
    app.setNavColor()
    if (this.data.team.length > 2){
      this.setData({
        swiperIndex: 1
      })
    }
  },
  swiperChange(e){
    this.setData({
      swiperIndex: e.detail.current
    })
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
  openPop(){
    this.setData({
      popVisible: true
    })
  },
  popClose(){
    this.setData({
      popVisible: false
    })
  },
  chooseImage(e){
    let _t = this;
    let { source } = e.currentTarget.dataset;
    let count = {
      camera: 1,
      album: _t.data.maxImageCount - _t.data.images.length
    }[source];
    wx.chooseImage({
      count,
      sizeType: ['original', 'compressed'],
      sourceType: [source],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        _t.setData({
          images: [..._t.data.images, ...tempFilePaths]
        })
      }
    })
    _t.popClose();
  },
  gotoTechnician(){
    wx.navigateTo({
      url: '/pages/user/technician/details/index'
    })
  }
})