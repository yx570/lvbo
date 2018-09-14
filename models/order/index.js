
const ajax = require('../../utils/ajax.js');
module.exports = {
  //采购列表
  //key
  goods: params => {
    return ajax({ path: '/goods/list', method: 'post', params, loading: false});
  },
  //采购详情
  //id
  detail: params => {
    return ajax({ path: '/goods/detail', method: 'post', params });
  },
  //采购订单列表
  //type //1 全部 3 待自提  4 等待发货 5已发货 6 已关闭  7 已完成
  orderlist: params => {
    return ajax({ path: '/order/list', method: 'post', params });
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