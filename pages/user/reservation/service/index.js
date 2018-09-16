const userModel = require('../../../../models/user/index.js');
const app = getApp();
Page({ 
  data: {
    service: '产后收腹',
    orderStatus: 1,
    duration: 0,
    timer: null
  },

  onShow(){

  },
  onHide(){
    this.closeTimer()
  },
  serviceStart(){
    this.setData({
      orderStatus: 2
    })
    this.openTimer()
  },
  openTimer(){
    this.closeTimer()
    let _t = this;
    let timer = setInterval(_=>{
      _t.setData({
        duration: _t.data.duration + 1
      })
    },1000)
    _t.setData({ timer })
  },
  closeTimer(){
    this.data.timer && clearInterval(this.data.timer)
  }
})


