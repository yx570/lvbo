const app = getApp();
const orderModel = require('../../../../models/order/index.js');
let wxCharts = require("../../../../plugins/wxcharts-min.js");
let lineChart = null;
Page({ 
  data: {
    infos: {
      name: '王晓丽'
    },
    chartBtns: [
      {
        label: '腰围',
        value: 1,
        checked: true
      },
      {
        label: '腹围',
        value: 2,
        checked: false
      },
      {
        label: '臀围',
        value: 3,
        checked: false
      }
    ],
    // 腰围
    ywDatas: [
      {
        label: '5月1',
        value: 90
      }, {
        label: '5月8',
        value: 101
      }, {
        label: '5月15',
        value: 98
      }, {
        label: '5月22',
        value: 92
      }, {
        label: '5月29',
        value: 87
      }
    ],
    // 腹围
    fwDatas: [
      {
        label: '5月1',
        value: 78
      }, {
        label: '5月8',
        value: 86
      }, {
        label: '5月15',
        value: 88
      }, {
        label: '5月22',
        value: 80
      }, {
        label: '5月29',
        value: 76
      }
    ],
    // 臀围
    twDatas: [
      {
        label: '5月1',
        value: 100
      }, {
        label: '5月8',
        value: 110
      }, {
        label: '5月15',
        value: 108
      }, {
        label: '5月22',
        value: 106
      }, {
        label: '5月29',
        value: 100
      }
    ]
  },
  onLoad(e) {
    app.setNavTitle(`我(${ this.data.infos.name })的工单`);
  },
  onReady() {
    let _t = this, windowWidth = 320;
    try {
      let res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      // do something when get system info failed
    }
    let { ywDatas } = this.data;
    lineChart = new wxCharts({
      canvasId: 'chart-canvas',
      type: 'line',
      width: windowWidth - 30,
      height: 150,
      legend: false,
      // 是否在图表中显示数据内容值
      // dataLabel: false,
      // 是否在图表中显示数据点图形标识
      // dataPointShape: true,
      categories: ywDatas.map(v => v.label),
      animation: true,
      // background: '#f3f3f3',
      series: [{
        color: '#00b0ab',
        data: ywDatas.map(v => v.value)
      }],
      xAxis: {
        // disableGrid: true,
        type: 'calibration'
      },
      yAxis: {
        title: ''
      },
      extra: {
        // curve曲线，straight直线 (default)
        lineStyle: 'curve'
      }
    });
  },
  onHide() {
    
  },
  updateChartData(categories = [], data = []) {
    let series = [{
      color: '#00b0ab',
      data
    }];
    lineChart.updateData({
      categories,
      series
    });
  },
  chartChange(e) {
    let { row, index } = e.currentTarget.dataset;
    if(!row.checked){
      this.setData({
        chartBtns: this.data.chartBtns.map(v => {
          v.checked = false;
          return v
        }),
        [`chartBtns[${ index }].checked`]: !row.checked
      });
      let chartData = [this.data.ywDatas, this.data.fwDatas, this.data.twDatas][index];
      this.updateChartData(chartData.map(v => v.label), chartData.map(v => v.value));
    }
  },
  formSubmit(e) {
    console.log(e)
  }
})


