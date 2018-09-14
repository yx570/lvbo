let app = getApp();
Page({
  data:{
    form:{},
    infos: {
      imgSrc: "",
      name: "张三",
      nickname: "123",
      sex: "男",
      birthday: "2018-07-10",
      provinceAndCity:'北京市 北京市',
      // province: "北京市",
      // city: "北京市",
      address: "朝阳区",
      qq: "666666"
    },
    labelFormat:{
      imgSrc: "我的头像",
      name: "姓名",
      nickname: "昵称",
      sex: "性别",
      birthday: "出生日期",
      provinceAndCity: '省/市',
      province: "省",
      city: "市",
      address: "详细地址",
      qq: "QQ号码"
    },
    isEdit:false
  },
  onLoad: function () {
    this.setData({
      addressInfos: app.data.addressInfos
    });
  },
  doEdit(){
    this.setData({
      isEdit:true
    });
  },
  itemTap(ev){
    console.log(ev);
  },
  formSubmit(){},
  formReset(){
    this.setData({
      isEdit: false
    });
  }
})