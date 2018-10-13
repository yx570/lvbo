
const app = getApp();
Page({
  data:{
    province: '',
    infos: {
      province: '广东身',
      city: '深圳市',
      area: '宝安区',
      name: '王菲',
      address: '',
      phone: '',
      tag: 1
    },
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
    ]
  },
  onLoad: function () {
    
  },
  tagChange(e){
    let { row } = e.currentTarget.dataset;
    this.setData({
      'infos.tag': row.value
    })
  }
})