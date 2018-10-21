// const userModel = require('../../../../models/user/index.js');
const app = getApp();
Page({ 
  data: {
   infos:{
      date: '2018年5月1日',
      timeRange: '9:00 ~ 10:00',
      title: '推腹Jamu',
      imageUrl: 'http://p6.qhimg.com/t01b95ebc4d963ef400.jpg',
      name: '王菲'
    },
    form: {
      technicianStar: 0,
      proStar: 0
    },
    popVisible: false,
    images: [
      'http://cms-bucket.nosdn.127.net/catchpic/3/38/38e204a37a7460b3b56eb198e7e1492a.jpg?imageView&thumbnail=550x0',
      'http://p6.qhimg.com/t01b95ebc4d963ef400.jpg'
    ],
    maxImageCount: 6,
    anonymous: true,
    technicianStar: 1,
    proStar: 1,
    technicianTags: [
      {
        label: '准时到达',
        checked: true
      },
      {
        label: '服务态度好',
        checked: false
      },
      {
        label: '善于沟通',
        checked: false
      },
      {
        label: '穿着得体',
        checked: false
      }
    ],
    proTags: [
      {
        label: '准时到达',
        checked: false
      },
      {
        label: '服务态度好',
        checked: false
      },
      {
        label: '善于沟通',
        checked: false
      }
    ]
  },
  onLoad: function () {
    
  },
  onShow: function () {
    
  },
  tagChange(e) {
    let { index, tags, row } = e.currentTarget.dataset;
    this.setData({
      [`${tags}[${index }].checked`]: !row.checked
    })
  },
  starChange(e) {
    let { index, attr } = e.currentTarget.dataset;
    this.setData({
      [`${attr}`]: index + 1
    })
  },
  formSubmit(e) {

  },
  preViewImage(e) {
    let current = e.currentTarget.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.images
    });
  },
  openPop() {
    this.setData({
      popVisible: true
    })
  },
  popClose() {
    this.setData({
      popVisible: false
    })
  },
  chooseImage(e) {
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
  }
})


