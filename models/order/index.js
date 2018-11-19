
const ajax = require('../../utils/ajax.js');
module.exports = {
  add: params => {
    return ajax({ path: '/Api/Order/addOrder', method: 'post', params });
  },
  orderlist: params => {
    return ajax({ path: '/Api/Order/getCustomerList', method: 'post', params });
  },
  orderItemlist: params => {
    return ajax({ path: '/Api/Order/getCustomertWaitServiceList', method: 'post', params });
  },
  sign: params => {
    return ajax({ path: '/Api/Order/orderPrePay', method: 'post', params });
  },
  // 更改时间，查询时间是否有技师
  // date 2018-01-01
  queryTimeList: params => {
    return ajax({ path: '/Api/Order/getAllTechnicianFreeTimeArea', method: 'post', params, loading: true });
  },
  changeTime: params => {
    return ajax({ path: '/Api/Order/changeService', method: 'post', params, loading: true });
  },
  queryTecList: params => {
    return ajax({ path: '/Api/Order/getTechnicianListByTimeArea', method: 'post', params, loading: true });
  },
  
}