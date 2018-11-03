
const ajax = require('../../utils/ajax.js');
module.exports = {
  //订单列表
  //page
  //page_size
  //order_code
  //order_status    wait_to_pay：待付款；wait_to_service：待服务；in_service：服务中；finish：已完结，为空就是全部
  orderlist: params => {
    return ajax({ path: '/Api/Order/getCustomerList', method: 'post', params });
  }, 

  // 更改时间，查询时间是否有技师
  // date 2018-01-01
  queryTimeList: params => {
    return ajax({ path: '/static/data/orderTime.js', method: 'get', params, loading: true});
  },

  //采购列表
  //key
  goods: params => {
    return ajax({ path: '/static/data/order.js', method: 'post', params, loading: false});
  },
  //采购详情
  //id
  detail: params => {
    return ajax({ path: '/goods/detail', method: 'post', params });
  },
  //线上订单列表
  // isShipped": true,   //true 已发货  false 未发货  不传为全部
  customerorderlist: params => {
    return ajax({ path: '/shipping-order/list', method: 'post', params });
  },
  //工作任务数统计
  membertasks: params => {
    return ajax({ path: '/member/tasks', method: 'post', params, loading: false});
  },
  // 包裹信息 
  // orderId
  packages: params => {
    return ajax({ path: '/order/packages', method: 'post', params });
  },
  // 物流信息 
  // packageId
  traces: params => {
    return ajax({ path: '/order/packages/traces', method: 'post', params });
  },
  // 确认收货
  // orderId
  receive: params => {
    return ajax({ path: '/order/receive', method: 'post', params });
  },
  // 确认收货
  // orderId
  cancel: params => {
    return ajax({ path: '/order/cancel', method: 'post', params });
  },
  // 删除订单
  // orderId
  delete: params => {
    return ajax({ path: '/order/delete', method: 'post', params });
  },
  // 发货
  // "orderId": "",
  // "deliveryCorp": "物流公司编码",
  // "trackingNo": "物流单号",
  // "skuIds": ["", ""]   //商品skuids
  orderShipping: params => {
    return ajax({ path: '/shipping-order/shipping', method: 'post', params, showToast: false});
  },
  // 订单详情
  // orderId
  view: params => {
    return ajax({ path: '/order/view', method: 'post', params });
  },
  // 新线上订单详情
  // id
  shippingOrderView: params => {
    return ajax({ path: '/shipping-order/view', method: 'post', params });
  },
  // 手动入库(提交)
  // "skuId": "",
  // "stock": 11    //修改后库存
  modify: params => {
    return ajax({ path: '/stock/modify', method: 'post', params });
  },
  // 手动入库（列表）
  //key
  stockall: params => {
    return ajax({ path: '/stock/all', method: 'post', params });
  },
}