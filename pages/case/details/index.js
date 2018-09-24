const caseModel = require('../../../models/case/index.js');
const wxParse = require('../../../wxParse/wxParse.js');

Page({
  data: {
    infos: {
      id: 0,
      title: '',
      date: ''
    }
  },
  onLoad(ev) {
    this.setData({
      'infos.id': ev.id
    })
    this.getCaseDetail(ev.id);
  },
  // 获取产品详情
  getCaseDetail(id) {
    caseModel.view({ id }).then(response => {
      this.setData({
        'infos.title': response.data.title,
        'infos.date': response.data.date
      })
      content: wxParse.wxParse('content', 'html', response.data.content, this, 12);
    }).catch(e => {});
  }
})