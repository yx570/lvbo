const app = getApp();
const authModel = require('../../../models/auth/index.js');
Page({
  data: {
    from: '',
    infos: {},
    ids: null,
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
    let id = ev.id || '';

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
      from: ev.from,
      id: id
    })
  },
  tagChange(e) {
    let { row } = e.currentTarget.dataset;
    this.setData({
      'infos.child_sort': row.value
    })
  },
  chooseAddress() {
    var _that = this;
    wx.navigateTo({
      url: '../chooseAddress/index?from=' + _that.data.from
    })
  },
  formSubmit(e) {
    let _that = this;
    let formData = e.detail.value;
    let infos = this.data.infos;
    let wxInfo = app.globalData.userWxInfo;
    let p = {};

    p.user_locate_detail_addr = formData.user_locate_detail_addr;   // 定位地址
    p.user_real_detail_addr = formData.user_real_detail_addr;       // 详细地址
    p.user_contact_phone = formData.user_contact_phone;             // 联系电话
    p.user_real_name = formData.user_real_name;                     // 联系电话

    p.child_sort = infos.child_sort;                                // 用户标签

    p.user_real_province = infos.user_real_province;
    p.user_real_city = infos.user_real_city;
    p.user_real_district = infos.user_real_district;

    p.user_wx_nick_name = infos.user_wx_nick_name;                  // 微信昵称
    p.user_wx_avatar_url = infos.user_wx_avatar_url;                // 用户微信头像地址
    p.user_locate_province = infos.user_locate_province;            // 微信 省
    p.user_locate_city = infos.user_locate_city;                    // 微信 市
    p.user_locate_district = '';                                    // 微信 区
    p.user_locate_longitude = infos.user_locate_longitude;          // 经度
    p.user_locate_latitude = infos.user_locate_latitude;            // 纬度
    p.customer_source = app.globalData.scene;                       // 来源
    app.globalData.userInfo = p;

    if (!p.user_locate_detail_addr) {
      app.alert({ content: '请选择所在位置' });
      return false;
    }
    if (!p.user_real_detail_addr) {
      app.alert({ content: '请输入详细地址' });
      return false;
    }
    if (!p.user_real_name) {
      app.alert({ content: '请输入联系人' });
      return false;
    }
    if (!p.user_contact_phone) {
      app.alert({ content: '请输入联系电话' });
      return false;
    }

    app.saveUserInfo(function () {
      switch (_that.data.from) {
        case 'cart':
          wx.switchTab({
            url: '../../tabBar/cart/index'
          })
          break;
        case 'proDetail':
          wx.navigateTo({
            url: '../../product/details/index?id=' + _that.data.id
          })
          break;
        case 'order':
          wx.navigateTo({
            url: '../../order/buyNow/index'
          })
          break;
        case 'user':
          wx.switchTab({
            url: '../../tabBar/user/index'
          })
          break;
      }
    })
  }
})