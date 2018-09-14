
const ajax = require('../../utils/ajax.js');
module.exports = {
  //采购列表
  //key
  query: params => {
    return ajax({ path: '/static/data/product.js', method: 'get', params, loading: true});
  },

}