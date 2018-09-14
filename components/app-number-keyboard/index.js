Component({
  externalClasses: [
    'iconfont',
    'icon-backspace'
  ],
  properties:{
    
  },
  data: {
    keys: [],
    inputs: []
  },
  ready(){
    let keys = [];
    for(let i = 1; i < 10; i++){
      keys.push({
        label: i,
        value: i
      });
    }
    keys = keys.concat([
      {
        label: '清空',
        value: -2
      },
      {
        label: '0',
        value: 0
      },
      {
        label: '回退',
        value: -1
      }
    ]);
    this.setData({
      keys
    });
  },
  methods:{
    itemTap(e){
      console.log(1)
      let { value } = e.currentTarget.dataset;
      let inputs = [];
      if(value == -2){
        this.setData({
          inputs: []
        });
      }else if(value == -1){
        if (this.data.inputs.length > 0){
          inputs = this.data.inputs.slice(0, this.data.inputs.length - 1);
          this.setData({
            inputs 
          });
        }
      }else {
        this.setData({
          inputs: [...this.data.inputs, value]
        });
      }
      this.triggerEvent('change', { value: this.data.inputs });
    }
  }
})

