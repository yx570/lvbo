
const app = getApp();
Page({
  ...app.loadcartlist,
  data: {
    
  },

  onLoad: function (ev) {
    var WxParse = require('../../../wxParse/wxParse.js');
    var id = ev.id;
    authModel.detail({ id }).then(response => {
      this.setData({
        id: response.data.id,
        slider: response.data.carousel,
        attributes: response.data.attributes,
        detailsList: response.data,
      })
      this.onChang(ev.id);
      content: WxParse.wxParse('content', 'html', response.data.description, this, 10)
    }).catch(error => {});
  }
})


