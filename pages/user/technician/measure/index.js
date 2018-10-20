const orderModel = require('../../../../models/order/index.js');
const app = getApp();
Page({ 
  data: {
    infos: {
      name: '王晓丽'
    }
  },
  onLoad(e) {
    app.setNavTitle(`我(${ this.data.infos.name })的工单`);
  },
  onShow() {
    
  },
  onHide() {
    
  },
  formSubmit(e) {
    console.log(e)
  }
})


