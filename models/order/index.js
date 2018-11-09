
const ajax = require('../../utils/ajax.js');
module.exports = {
  add: params => {
    return ajax({ path: '/Api/Order/addOrder', method: 'post', params });
  }, 
  orderlist: params => {
    return ajax({ path: '/Api/Order/getCustomerList', method: 'post', params });
  }, 

  // 更改时间，查询时间是否有技师
  // date 2018-01-01
  queryTimeList: params => {
    return ajax({ path: '/static/data/orderTime.js', method: 'get', params, loading: true});
  }
}