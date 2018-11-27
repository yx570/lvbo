// pages/tabBar/user/index.js
let walletModel = require('../../../models/user/wallet/index');
let memberModel = require('../../../models/user/member/index');
const authModel = require('../../../models/auth/index.js');
let app = getApp();
Page({
  ...app.loadMoreMethods,
  /**
   * 页面的初始数据
   */
  data: {
    userInfos: {
      userName: '',     //用户名
      photo: '',        //头像
      id: 0
    },
    orderInfos: [
      {
        key: 'wait_to_pay',
        label: '待付款',
        value: 0,
        icon: 'dfk'
      }, {
        key: 'wait_to_service',
        label: '待服务',
        value: 2,
        icon: 'dfw'
      }, {
        key: '3',
        label: '待评价',
        value: 0,
        icon: 'dpj'
      }, {
        key: '0',
        label: '全部订单',
        value: 0,
        icon: 'qbdd'
      }
    ],
    tools: [
      {
        link: '',
        label: '我的历程',
        icon: 'licheng'
      }, {
        link: '/pages/user/currency/list/index',
        label: '我的新生币',
        icon: 'currency'
      }, {
        link: '/pages/user/voucher/index',
        label: '代金券',
        icon: 'voucher'
      }, {
        link: '/pages/user/address/index',
        label: '服务地址',
        icon: 'address'
      }, {
        link: '/pages/user/recommendCode/index',
        label: '我的推荐码',
        icon: 'code'
      }
    ],
    type: 1,
    tabs: [
      {
        key: '0',
        label: '我的工单'
      },
      {
        key: '1',
        label: '已完成工单'
      }
    ],
    currentTab: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfos = wx.getStorageSync('userInfo');
    this.setData({
      userInfos
    });
    if (userInfos.mini_program_user_role_code == 'technician') {
      app.setNavTitle(`我(${userInfos.user_wx_nick_name})的工单`);
    } else {
      app.setNavTitle(' ')
    }
    app.setNavColor()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userInfos = this.data.userInfos;
    if (userInfos.mini_program_user_role_code == 'technician') {
      this.setData({
        type: 2
      });
      this.getWorkList();
    }
    authModel.getUserInfo().then(res => {
      this.setData({
        userInfos: res.dataList.miniProgramUserInfo
      });
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
  getWorkList() {
    let _t = this;
    let status = this.data.currentTab == '0' ? 'wait_to_service' : 'finish';
    // let status = this.data.currentTab == '0' ? 'book' : 'finish';
    let params = {
      page_size: 10,
      schedule_status: status
    };
    this._getList({
      request: memberModel.tasks,
      params
    }, function (res) {
      // res.list.forEach((v, i) => {
      //   v.id == items.technician_id && (v.checked = true);
      //   v.star = 5;
      // })
      _t.setData({
        list: res.list,
        hasNextPage: !res.hasNextPage
      });
    });
  },
  tabChange(e) {
    let { key } = e.currentTarget.dataset;
    if (key !== this.data.currentTab) {
      this.setData({
        currentTab: key
      })
    }
  },
  navigateChange(e) {
    let { key } = e.currentTarget.dataset;
    wx.switchTab({
      url: '/pages/tabBar/order/index'
    });
    app.globalData.currentOrderTab = key;
  },
  getMeasureTime() {
    let startTime;
    let _this = this;
    this.data.list.forEach(function (value, index, arrSelf) {
      if (value.status == 4) {
        let now = util.formatTime(new Date());

        value.startTime = value.startTime || now;
        console.log(value.startTime);
        startTime = value.startTime.replace(/-/g, '/');
        let oldTime = new Date(startTime).getTime() / 1000;
        let newTime = new Date(now).getTime() / 1000;
        let serviceTime = newTime - oldTime;

        //计算相差小时数
        let leave1 = serviceTime % (60 * 60)    //计算天数后剩余的毫秒数
        let h = Math.floor(serviceTime / (60 * 60))
        //计算相差分钟数
        let leave2 = leave1 % (60 * 60)        //计算小时数后剩余的毫秒数
        let m = Math.floor(leave2 / (60))
        //计算相差秒数
        let leave3 = leave2 % (60)      //计算分钟数后剩余的毫秒数
        let s = Math.round(leave3)

        _this.setData({
          [`list[${index}].h`]: h.toString().padStart(2, '0'),
          [`list[${index}].m`]: m.toString().padStart(2, '0'),
          [`list[${index}].s`]: s.toString().padStart(2, '0')
        });
        _this.countTime(index, value);
      }
    })
  },
  countTime(index, value) {
    let _t = this;
    clearInterval(this.data.list[index].t);
    this.data.list[index].t = setInterval(function () {
      let h = parseInt(value.h);
      let m = parseInt(value.m);
      let s = parseInt(value.s);
      s += 1;
      if (s > 59) {
        s = 0;
        m += 1;
      }
      if (m > 59) {
        m = 0;
        h += 1;
      }
      _t.setData({
        [`list[${index}].h`]: h.toString().padStart(2, '0'),
        [`list[${index}].m`]: m.toString().padStart(2, '0'),
        [`list[${index}].s`]: s.toString().padStart(2, '0')
      });
    }, 1000);
  },
  beginMeasure(ev) {
    let { id, index } = ev.currentTarget.dataset;
    let now = new Date();
    let h = now.getHours();
    let m = now.getMonth() + 1;
    let s = now.getSeconds();
    this.setData({
      [`list[${index}].status`]: 4,
      [`list[${index}].startTime`]: util.formatTime(new Date()),
      [`list[${index}].h`]: h.toString().padStart(2, '0'),
      [`list[${index}].m`]: m.toString().padStart(2, '0'),
      [`list[${index}].s`]: s.toString().padStart(2, '0')
    })
    this.getMeasureTime();
  },
  stopMeasure(ev) {
    let { index, row } = ev.currentTarget.dataset;
    clearInterval(this.data.list[index].t);
    this.setData({
      [`list[${index}].status`]: 5
    })
  },
  clientPosition(ev) {
    let { id } = ev.currentTarget.dataset;
    let [ data ] = this.data.list.filter(v => {
      return v.id == id;
    });
    app.globalData.clientPosition = data;
    wx.navigateTo({
      url: '../../user/clientPosition/index'
    })
  }
})