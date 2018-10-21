// components/app-timePicker/index.js
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    popVisible: {
      type: Boolean,
      value: false
    },
    popId: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    lists: [
      { "id": "1", "name": "项目一", "className": "curr" },
      { "id": "2", "name": "项目二", "className": "" },
      { "id": "3", "name": "项目三", "className": "" },
      { "id": "4", "name": "项目四", "className": "" },
      { "id": "5", "name": "项目五", "className": "" }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindChange(e) {
      const val = e.detail.value;
      console.log(val);
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]]
      })
    },
    popClose() {
      this.setData({
        popVisible: false
      });
    },
    popSure(ev) {
      let y = this.data.year.toString().padStart(2, "0");
      let m = this.data.month.toString().padStart(2, "0");
      let d = this.data.day.toString().padStart(2, "0");
      let str = [y, m, d].join('-');
      this.triggerEvent('getPickerTime', str);
      this.setData({
        popVisible: false
      });
    },
    changeProject(e) {
      let index = e.currentTarget.dataset.index;
      this.data.lists.forEach(function (value, index, arrSelf) {
        arrSelf[index].className = '';
      });
      this.data.lists[index].className = 'curr';
      this.setData({
        lists: this.data.lists
      });
    }
  }
})