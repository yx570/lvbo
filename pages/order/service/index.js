
Page({
  data: {
    list: [
      {
        id: 0,
        title: '金谷酱酒',
        image: '../../../../static/images/default.png',
        size: '50ml',
        number: '201807061413',
        price: '500.00',
        date: '2018-06-14',
        overdue: false
      },
      {
        id: 1,
        title: '金谷酱酒',
        image: '../../../../static/images/default.png',
        size: '50ml',
        number: '201807061413',
        price: '500.00',
        date: '2018-06-14',
        overdue: true
      },
      {
        id: 2,
        title: '金谷酱酒',
        image: '../../../../static/images/default.png',
        size: '50ml',
        number: '201807061413',
        price: '500.00',
        date: '2018-06-14',
        overdue: true
      }
    ]
  },
  onLoad: function (options) {
  },
  toApplyFor(ev){
    let { id } = ev.currentTarget.dataset;
    
  }
})