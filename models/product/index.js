
const ajax = require('../../utils/ajax.js');
module.exports = {
  //产品列表
  //key
  query: params => {
    return ajax({ path: '/static/data/product.js', method: 'get', params, loading: true});
  },
  //产品详情
  //key
  view: params => {
    return ajax({ path: '/static/data/productDetails.js', method: 'get', params, loading: true});
  },
  //产品详情第一评论
  //key
  oneComment: params => {
    return ajax({ path: '/static/data/oneComment.js', method: 'get', params, loading: true});
  },

}