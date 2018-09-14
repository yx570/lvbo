Component({
  externalClasses: ['my-class'],
  data: {
    flag: 0,
    xing: [
      {
        key: '1'
      },
      {
        key: '2'
      },
      {
        key: '3'
      },
      {
        key: '4'
      },
      {
        key: '5'
      }
    ],
  },
  changeColor: function (e) {
    console.log(1)
    // var key = e.currentTarget.dataset.key;
    // this.setData({
    //   flag: key
    // });
  }

})

