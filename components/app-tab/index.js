Component({
  options: {
    multipleSlots: true 
  },
  properties: { 
    styles:{
      type:String,
      value:''
    },
    itemStyles:{
      type:String,
      value:''
    },
    equal: Boolean,
    align: {
      type: String,
      value: 'center'
    },
    tabs:{
      type:Array,
      value:[]
    },
    defaultItem:{
      type:String,
      value:''
    },
    fixed:{
      type:Boolean,
      value:false
    }
  },
  data: {
    currentKey:'',
    overflow:false,
    parentWidth:0,
    childWidth:0,
    scrollLeft:0
  },
  ready(){
    if(this.properties.defaultItem){
      this.setData({
        currentKey:this.properties.defaultItem
      });
    }else{
      this.properties.tabs.length > 0 && this.setData({
        currentKey:this.properties.tabs[0].key
      });
    }
    let parentWidth = 0;
    let childWidth = 0;
    let query = wx.createSelectorQuery().in(this);
    query.select('.scroll-view').boundingClientRect();
    query.selectAll('.scroll-view-item').boundingClientRect().exec(r=>{
      parentWidth = r[0].width || 0;
      let childs = r[1] || [];
      childs.forEach(child => {
        childWidth += child.width;
      });
      this.setData({
        parentWidth,
        childWidth
      });
      if(childWidth > parentWidth){
        this.setData({
          overflow:true
        });
      }
    });
  },
  methods:{
    itemTap(ev){
      let { key } = ev.currentTarget.dataset;
      this.setData({
        currentKey:key
      });
      this.triggerEvent('itemTap',{key});
    },
    scroll(ev){
      this.setData({
        scrollLeft:ev.detail.scrollLeft
      });
    }
  }
})