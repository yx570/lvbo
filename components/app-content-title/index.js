Component({
  properties: { 
    title: {
      type: String,
      value: ''
    },
    subTitle: {
      type: String,
      value: ''
    },
    titleColor: {
      type: String,
      value: '#333333'
    },
    subTitleColor: {
      type: String,
      value: '#c5c5c5'
    },
    dotColor: {
      type: String,
      value: '#00b0ab'
    }
  },
  ready(){
    this.setData({
      subTitle: this.data.subTitle.toUpperCase()
    })
  }
})