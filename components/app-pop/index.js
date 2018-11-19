Component({
  options: {
    multipleSlots: true 
  },
  properties: { 
    styles:{
      type:String,
      value:''
    },
    direction:{
      type:String,
      value:'bottom'
    },
    visible:{
      type:Boolean,
      value:false
    },
    transparentMask:{
      type:Boolean,
      value:false
    },
    maskClose:{
      type:Boolean,
      value:true
    }
  },
  data: {
    classNames:{
      top:{
        0:'slideOutUp',
        1:'slideInDown'
      },
      right:{
        0:'slideOutRight',
        1:'slideInRight'
      },
      bottom:{
        0:'slideOutDown',
        1:'slideInUp'
      },
      left:{
        0:'slideOutLeft',
        1:'slideInLeft'
      }
    },
    isInit: true
  },
  ready() {
    setTimeout(()=>{
      this.setData({
        isInit: false
      });
    }, 400)
  },
  methods:{
    closePop(){
      this.setData({
        visible:false
      });
      this.triggerEvent('close',{});
      wx.showTabBar({});
    }
  }
})