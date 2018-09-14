const date = new Date()
const years = []
const months = []
const days = []
for (let i = 2000; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}
for (let i = 1; i <= mGetDate(2000,1); i++) {
  days.push(i)
}
function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}
const walletModel = require('../../../../models/user/wallet/index.js');
const app = getApp();
Page({
  ...app.loadMoreMethods,
  data:{
    list:[],
    selectHeaders:{
      type:'类型',
      startTime: '开始时间',
      destTime: '结束时间'
    },
    statusFormat:{
      0:'充值失败',
      1:'充值成功'
    },
    popVisible:false,
    popType:'type',
    test:'全部',
    currentTypeId:0,
    types:[],
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    pickers: [0, 0, 0],
    start:'',
    end:'',
    currentStarts: [0, 0, 0],
    currentEnds: [0, 0, 0]
  },
  onLoad: function () {
    this.setData({
      currentStarts:[
        years.indexOf(date.getFullYear()),
        months.indexOf(date.getMonth() + 1),
        days.indexOf(date.getDate())
      ],
      currentEnds: [
        years.indexOf(date.getFullYear()),
        months.indexOf(date.getMonth() + 1),
        days.indexOf(date.getDate())
      ]
    });
    this._initLoadMore();
    this.getList(); 
    walletModel.detailstype().then(response => {
      var b = {value: '', key: "全部"};
      var a = response.data;
      a = a.concat([b]);
      var c = a.reverse();
      console.log(c)
      this.setData({
        types: c,
        
      })
    }).catch(error => { });
  },
  getList(request = walletModel.details) {
    console.log(1)
    let _t = this;
    let params = { type:this.data.currentTypeId , start : this.data.start , end : this.data.end};
    console.log(params)
    this._getList({ request, params }, function (res) {
      console.log(res)
      _t.setData({
        list: res.list,
        hasNextPage: res.hasNextPage
      });
    });
  },
  selectTap(ev){
    console.log(this.data.currentStarts)
    let { key } = ev.currentTarget.dataset;
    console.log(ev.currentTarget.dataset)
    if(this.data.popVisible){
      if(this.data.popType !== key){
        this.setData({
          popType:key
        })
      }else{
        this.setData({
          popVisible:false
        });
      }
    }else{
      this.setData({
        popType:key,
        popVisible:true
      });
    }
    // console.log(this.data.currentStarts)
    if (this.data.popType != 'type'){
      this.setData({
        pickers: {
          startTime: this.data.currentStarts,
          destTime: this.data.currentEnds
        }[key]
      });
    }
  },
  popClose(ev) {
    this._initLoadMore();
    this.getList(); 
    this.showTitle();
    this.setData({
      popVisible:false
    });
  },
  showTitle(){
    var s = this.data.currentStarts[1] + 1;
    var d = this.data.currentEnds[1] + 1;
    var s2 = this.data.currentStarts[2] + 1;
    var d2 = this.data.currentEnds[2] + 1;
    var startTime = this.data.currentStarts[0] + '年' + s + '月' + s2 + '日';
    var destTime = this.data.currentEnds[0] + '年' + d + '月' + d2 + '日';
    this.setData({
      selectHeaders: {
        type: this.data.test,
        startTime: startTime,
        destTime: destTime,
      },
    });
  },
  typeSelect(ev){
    let { id,value } = ev.currentTarget.dataset;
    this.setData({
      currentTypeId: id,
      test:value,
    });
    this.popClose();
  },
  pickerChange(ev) {
    console.log(ev)
    let v = ev.detail.value;
    let r = `${this.data.years[v[0]]}-${this.data.months[v[1]]}-${this.data.days[v[2]]}`;
    
    if (v[2] == this.data.pickers[2]){
      let days = [];
      for (let i = 1; i <= mGetDate(this.data.years[v[0]], this.data.months[v[1]]); i++) {
        days.push(i);
      }
      this.setData({
        days 
      });
    }
    if (this.data.popType == 'startTime'){
      this.setData({
        start: r,
        currentStarts: v,
        pickers: v
      });
    }else{
      this.setData({
        end: r,
        currentEnds: v,
        pickers: v
      });
    }

  },
})