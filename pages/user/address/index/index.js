let app = getApp();
const { absolutePath } = require('../../../../utils/path.js');
const addressModel = require('../../../../models/user/address/index.js');
Page({
  data:{
    list: [],
    currentRow:{},
    selectRow: {},
    ress:1
  },
  onLoad:function(e){
    if(e.ress){
      this.setData({
        ress: e.ress
      });
    }
  },
  onShow: function (e) {
    this.getList();
  },
  navigateChange(ev){
    wx.navigateTo({
      url: '../add/index?type=1'
    });
  },
  getList(){
    addressModel.list().then(response=>{
      this.setData({
        list: response.data || []
      });
    }).catch(e => {});
  },
  setDefultRow(ev){
    let { id } = ev.currentTarget.dataset;
    addressModel.default({ id }).then(response=>{
      this.getList();
    }).catch(e => {});
  },
  editRow(ev){
    let { row } = ev.currentTarget.dataset;
    this.setData({
      currentRow: row
    });
    app.pages.add(this);
    wx.navigateTo({
      url: '../add/index?type=2'
    });
  },
  deleteRow(ev){
    let { id } = ev.currentTarget.dataset;
    wx.showModal({
      title: '温馨提示',
      content: '确认删除吗？',
      confirmColor: '#ff5100',
      success: res => {
        if (res.confirm) {
          addressModel.delete({ id }).then(response => {
            wx.showToast({
              title: '删除成功！',
              icon: 'success',
              duration: 2000
            });
            this.getList();
          }).catch(e => {});
        }
      }
    });
  },
  selectAddress(ev) {
    let { row } = ev.currentTarget.dataset;
    getApp().globalData.selectRow = row;
    getApp().globalData.selectRowType = 1;
    wx.navigateBack();
  }
})