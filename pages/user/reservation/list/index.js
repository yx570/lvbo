const userModel = require('../../../../models/user/index.js');
const app = getApp();
Page({ 
  ...app.loadMoreMethods,
  data: {
    list: [], 
    hasNextPage: false
  },
  getList: function () {
    let _t = this;
    this._getList({
      request: userModel.reservationQuery
    }, function (res) {
      console.log(res)
      _t.setData({
        list: res.list,
        hasNextPage: !res.hasNextPage
      });
    });  
  },
  
  //load
  onLoad: function () {
    this.getList();
  },
  onShow: function () {
    
  }
})


