const app = getApp();
const authModel = require('../../../models/auth/index.js');
const orderModel = require('../../../models/order/index.js');
Page({
  data: {
    from: '',
    infos: {},
    ids : null,
    tags: [
      {
        label: '首胎',
        value: 1
      }, {
        label: '二胎',
        value: 2
      }, {
        label: '二胎以上',
        value: 3
      }
    ],
  },
  onLoad: function (ev) {
    let _that = this;

    let userInfo = app.globalData.userInfo;
    if (userInfo) {
      _that.setData({
        infos: userInfo,
      });
    } else {
      app.getUserWxInfo(function () {
        userInfo = app.globalData.userInfo;
        _that.setData({
          infos: userInfo,
        });
      })
    }

    _that.setData({
      from: ev.from
    })
  },
  tagChange(e) {
    let { row } = e.currentTarget.dataset;
    this.setData({
      'infos.child_sort': row.value
    })
  },
  chooseAddress() {
    wx.navigateTo({
      url: '../chooseAddress/index'
    })
  },
  formSubmit(e) {
    let formData = e.detail.value;
    let infos = this.data.infos;
    let wxInfo = app.globalData.userWxInfo;
    let p = {};

    p.user_locate_detail_addr = formData.user_locate_detail_addr;   // 定位地址
    p.user_real_detail_addr = formData.user_real_detail_addr;       // 详细地址
    p.user_contact_phone = formData.user_contact_phone;             // 联系电话
    p.user_real_name = formData.user_real_name;                     // 联系电话

    p.child_sort = infos.child_sort;                                // 用户标签

    p.user_real_province = infos.user_real_city;
    p.user_real_city = infos.user_real_city;
    p.user_real_district = infos.user_real_district;

    p.user_wx_nick_name = wxInfo.nickName;                          // 微信昵称
    p.user_wx_avatar_url = wxInfo.avatarUrl;                        // 用户微信头像地址
    p.user_locate_province = wxInfo.province;                       // 微信 省
    p.user_locate_city = wxInfo.city;                               // 微信 市
    p.user_locate_district = '';                                    // 微信 区
    p.user_locate_longitude = infos.user_locate_longitude;          // 经度
    p.user_locate_latitude = infos.user_locate_latitude;            // 纬度
    p.customer_source = app.globalData.scene;                       // 来源

    if (!p.user_locate_detail_addr) {
      app.alert({content:'请选择所在位置'});
      return false;
    }
    if (!p.user_real_detail_addr) {
      app.alert({content:'请输入详细地址'});
      return false;
    }
    if (!p.user_real_name) {
      app.alert({content:'请输入联系人'});
      return false;
    }
    if (!p.user_contact_phone) {
      app.alert({content:'请输入联系电话'});
      return false;
    }

    wx.showLoading({
      title: '',
    });
    authModel.save(p).then(res => {
      let url = '';
      switch(this.data.from) {
        case 'cart':
          let p = {};
          let total = 0;
          let id = [];
          let skuName = [];
          let skuNums = [];
          app.globalData.goSettleList.forEach(v => {
            console.log(v);
            id.push(v.id);
            skuName.push(v.defaultCombo.sku_name);
            skuNums.push(v.quantity);
            total += parseFloat(v.price);
          });
          p.product_id = id.join(',');
          p.sku_name = skuName.join(',');
          p.sku_num = skuNums.join(',');
          p.order_amount = total;
          orderModel.add(p).then(res => {
            console.log(res);
            // wx.navigateTo({
            //   url: '../../order/buyNow/index'
            // })
          });
          break;
        case 'user':
          wx.switchTab({
            url: '../../tabBar/user/index'
          })
          break;
        default: 
      }
    });
  }
})