
const app = getApp();
Page({
  data:{
    shareBg: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2369419058,1797305489&fm=27&gp=0.jpg',
    shareImg: '',
    popVisible: false,
    canvasWidth: 300,
    canvasHeight: 200,
    isAuth: true
  },
  onLoad: function () {
    
  },
  imgLoad(e) {
    let _t = this,
        { width, height } = e.detail;
    const query = wx.createSelectorQuery(),
      ctx = wx.createCanvasContext('shareCanvas');
    query.select('#pop-img-box').boundingClientRect();
    query.exec(function (res) {
      _t.setData({
        canvasWidth: res[0].width,
        canvasHeight: res[0].height
      });
      // _t.drawImg(ctx, _t.data.shareBg);
      wx.downloadFile({
        url: _t.data.shareBg,
        success(res) {
          if (res.statusCode === 200) {
            _t.drawImg(ctx, res.tempFilePath);
          }
        }
      });
    })
  },
  drawImg(ctx, tempFilePath) {
    let _t = this;
    ctx.drawImage(tempFilePath, 0, 0, this.data.canvasWidth, this.data.canvasHeight);
    ctx.draw()
    ctx.setFillStyle('red') 
    ctx.setFontSize(22) // 文字字号：22px
    ctx.fillText("推荐码分享", 30, 50)
    ctx.draw(true, setTimeout(function () {
      wx.canvasToTempFilePath({
        width: _t.data.canvasWidth,
        height: _t.data.canvasHeight,
        canvasId: 'shareCanvas',
        success(res) {
          _t.setData({
            shareImg: res.tempFilePath
          })
        }
      })
    }, 1000));
  },
  saveImage() {
    let _t = this;
    wx.saveImageToPhotosAlbum({
      filePath: _t.data.shareImg,
      success(res) {
        app.toastSuccess('保存成功！')
      },
      fail(err) {
        if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
          app.toastError('未授权，请先授权！');
          this.setData({
            isAuth: false
          })
        }
      }
    })
  },
  openSettingCallback(e) {
    console.log(e)
    let isAuth = e.detail.authSetting['scope.writePhotosAlbum'];
    this.setData({
      isAuth
    })
  },
  openPop() {
    this.setData({
      popVisible: true
    });
  },
  closePop(ev) {
    this.setData({
      popVisible: false
    });
  }
})