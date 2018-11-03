
const ajax = require('../../utils/ajax.js');
module.exports = {
  //产品列表
  //key
  query: params => {
    return ajax({ path: '/Api/Product/getProducts', method: 'post', params, loading: true});
  },
  //产品详情
  //key
  view: params => {
    return ajax({ path: '/Api/Product/getSingleProduct', method: 'post', params, loading: true});
  },
  //产品详情第一评论
  //key
  oneComment: params => {
    return ajax({ path: '/static/data/oneComment.js', method: 'get', params, loading: true});
  },

}