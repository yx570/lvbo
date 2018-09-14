const authModel = require('../../../../models/auth/index.js');
const app = getApp();
Page({
  data:{
    form:{
      oldPassword:'',
      newPassword:''
    },
    showOld:false,
    showNew:false
  },
  toggleShow(ev){
    let { key } = ev.currentTarget.dataset;
    switch (key){
      case 'showOld':
        this.setData({
          showOld: !this.data.showOld
        });
        break;
      case 'showNew':
        this.setData({
          showNew: !this.data.showNew
        });
        break;
    }
  },
  inputChange(ev){
    let { key } = ev.currentTarget.dataset;
    let { value } = ev.detail;
    this.setData({
      [`form.${key}`]: value
    });
  },
  formSubmit(ev){
    let { oldPassword, newPassword } = ev.detail.value;
    app.test.all([
      {
        type: 'string',
        label: '原密码',
        value: oldPassword
      },
      {
        type: 'password',
        label: '新密码',
        value: newPassword
      }
    ]).then(()=>{
      // 验证通过todo
      authModel.modifyPassword({
        password: oldPassword,
        newPassword
      }).then(response=>{
        wx.navigateBack();
        wx.showToast({
          title: '操作成功！',
          icon: 'success',
          duration: 2000
        });
      }).catch(error=>{});
    }).catch(error=>{
      // 验证不通过
      wx.showToast({
        title: error.message,
        icon: 'none',
        duration: 2000
      })
    });
  }
})