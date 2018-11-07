
const app = getApp();
Page({
  data:{
    province: '',
    infos: {
      province: '广东省',
      city: '深圳市',
      area: '宝安区',
      name: '王菲',
      address: '',
      lat: '',
      lng: '',
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
    ],
    region: ['广东省', '深圳市', '宝安区']
  },
  onLoad: function (ev) {
    let info = this.data.infos;
    info.address = ev.address;
    info.lat = ev.lat;
    info.lng = ev.lng;
    this.setData({
      infos: info,
    })
  },
  tagChange(e){
    let { row } = e.currentTarget.dataset;
    this.setData({
      'infos.tag': row.value
    })
  },
  bindRegionChange(e) {
    // console.log(e)
    let { value, code, postcode } = e.detail;
    this.setData({
      region: value
    })
  },
  chooseAddress() {
    wx.navigateTo({
      url: '../chooseAddress/index'
    })
  },
  formSubmit(e) {

  }
})