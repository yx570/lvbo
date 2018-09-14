let app = getApp();
const addressModel = require('../../../../models/user/address/index.js');
Page({
  data:{
    list: [],
    selectRow: {},
    currentId: 0
  },
  onLoad(options){
    let { id } = options || {};
    app.pages.add(this);
    this.setData({
      currentId: id
    });
  },
  onShow(){
    addressModel.list().then(response => {
      let datas = response.data || [];
      datas.forEach(v => {
        v.checked = v.id == this.data.currentId ? true : false;
      });
      this.setData({
        list: datas
      });
    }).catch(e => { });
  },
  navigateChange(ev){
    wx.navigateTo({
      url: '../add/index'
    });
  },
  selectAddress(ev){
    let { row } = ev.currentTarget.dataset;
    this.setData({
      selectRow: row
    });
    wx.navigateBack();
  }
})