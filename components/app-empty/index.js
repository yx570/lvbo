Component({
  externalClasses: ['iconfont'],
  options: {
    multipleSlots: true 
  },
  properties: { 
    tips:{
      type:String,
      value:'暂无数据'
    },
    iconClass:{
      type:String,
      value:''
    },
    imgSrc:{
      type: String,
      value: '../../static/images/empty-list.png'
    }
  },
  data: {
    
  },
  ready(){
    
  },
  methods:{
    
  }
})