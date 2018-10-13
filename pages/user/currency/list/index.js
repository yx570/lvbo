
const app = getApp();
Page({
  data:{
    infos: {
      total: 5203,
      available: 185
    },
    currentTab: '0',
    tabs: [
      {
        key: '0',
        label: '全部'
      },
      {
        key: '1',
        label: '我的提成'
      },
      {
        key: '2',
        label: '我的消费'
      },
      {
        key: '3',
        label: '我的提现'
      },
    ]
  },
  onLoad: function () {
    app.setNavTitle(' ')
    app.setNavColor()
  },
  tabChange(e){
    let { key } = e.currentTarget.dataset;
    if(key !== this.data.currentTab){
      this.setData({
        currentTab: key
      })
    }
  }
})