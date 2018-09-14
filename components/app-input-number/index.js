Component({
  properties:{
    quantity:{
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    min: {
      type: Number,
      value: 1
    }
  },
  methods:{
    quantityChange(e){
      let { value } = e.currentTarget.dataset;
      let { min, quantity } = this.properties;
      let sum = Number(quantity) + Number(value);
      sum <= min && (sum = min);
      this.setData({
        quantity: sum
      });
      this.triggerEvent('change', { value: sum });
    },
    inputBlur(e){
      let { value } = e.detail;
      let { min, quantity } = this.properties;
      let sum = Number(value);
      sum <= min && (sum = min);
      this.setData({
        quantity: sum
      });
      this.triggerEvent('change', { value: sum });
    }
  }
})

