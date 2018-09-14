const manageModel = require("../../../../models/manage/index.js");
Page({
  data:{
    infos: {},
    key: 2,
    applyId: 0,
    refuse: false
  },
  onLoad: function (options) {
    let { key,id } = options || {};
    this.setData({
      key,
      applyId: id
    });
    let request = [
      '',
      manageModel.getDeliverDetail,
      manageModel.getBuybackDetail
    ][key - 1];
    request({ id }).then(response=>{
      this.setData({
        infos: response.data || {}
      });
    }).catch(e=>{

    });
  },
  checkboxChange(ev){
    this.setData({
      refuse: ev.detail.value && ev.detail.value.length > 0 ? true : false
    });
  },
  formSubmit(ev){
    let { remark } = ev.detail.value;
    let { applyId, key, refuse } = this.data;
    let request = [
      manageModel.auditPassDeliverApply,
      manageModel.auditRefuseDeliverApply,
      manageModel.auditPassBuybackApply,
      manageModel.auditRefuseBuybackApply
    ];
    let index = 0;
    if (!refuse){
      index = key == 2 ? 0 : 2;
    }else{
      index = key == 2 ? 1 : 3;
    }
    request[index]({ applyId, remark }).then(response=>{
      wx.showToast({
        title: '操作成功！',
        icon: 'success',
        duration: 2000
      });
      let nKey = Number(key) + 2;
      wx.redirectTo({
        // url: `../details/index?id=${applyId}&key=${key}`
        url: `../index/index?key=${nKey}`
      });
    }).catch(e=>{});
  }
})