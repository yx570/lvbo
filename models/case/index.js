
const ajax = require('../../utils/ajax.js');
module.exports = {
  //案例列表
  //key
  query: params => {
    return ajax({ path: '/static/data/case.js', method: 'get', params, loading: true});
  },
  //产品详情
  //key
  view: params => {
    return ajax({ path: '/static/data/caseDetails.js', method: 'get', params, loading: true});
  }
}