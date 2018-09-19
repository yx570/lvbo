// const userModel = require('../../../../models/user/index.js');
const app = getApp();
Page({ 
  data: {
    productInfos:{
      date: '5月1日',
      timeRange: '9:00 ~ 10:00',
      title: 'abc',
      imageUrl: '/static/images/demo/b1.jpg',
      name: '123',
      star: 5,
      times: [
        {
          time: '5月1日 9:00',
          content: '123123'
        },
        {
          time: '5月1日 9:30',
          content: '123123'
        },
        {
          time: '5月1日 10:00',
          content: '123123'
        }
      ]
    },
    form: {
      personStar: 0,
      productStar: 0
    },
    personTexts: [
      {
        text: '准时到达',
        checked: false
      },
      {
        text: '服务态度好',
        checked: false
      },
      {
        text: '礼貌',
        checked: false
      },
      {
        text: '善于沟通',
        checked: false
      },
      {
        text: '穿着得体',
        checked: false
      }
    ],
    productTexts: [
      {
        text: '效果明显',
        checked: false
      },
      {
        text: '无副作用',
        checked: false
      },
      {
        text: '物超所值',
        checked: false
      },
      {
        text: '值得推荐',
        checked: false
      }
    ],
    images: []
  },
  onLoad: function () {
    
  },
  onShow: function () {
    
  }
})


