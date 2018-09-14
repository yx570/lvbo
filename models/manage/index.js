
const ajax = require('../../utils/ajax.js');
module.exports = {
  /**
   * 获取代理记录分页
   * @param[Number]  page 
   * @param[Number]  rows 
   * @param[String]  accountName    //会员名称
   * @param[String]  realName       //真实姓名
   * @param[String]  phoneNumber    //手机号码
   * @param[String]  agentTimeStart //合伙时间 开始
   * @param[String]  agentTimeEnd   //合伙时间 结束
   * @param[String]  orderId        //代理订单号
   * @param[String]  goodsName      //商品名称
   * @param[Number]  paymentStatus  //付款状态 1：未付款 2:已付款
   * @param[Number]  jinguId        //金谷Id，就是所属区域 
   * @param[Number]  businessId     //代理业务ID
   * @param[String]  direction      //排序方式(desc、asc) 默认desc
   * @param[String]  property       //排序字段
  */
  getBusinessOrderPage: params => {
    return ajax({ path: '/partnerAgent/getBusinessOrderPage', method: 'post', params });
  },
  /**
   * 获取代理详情
   * @param[String]  id   //订单Id
  */
  getBusinessOrderDetail: params => {
    return ajax({ path: '/partnerAgent/getBusinessOrderDetail', method: 'post', params });
  },
  /**
   * 获取核销记录分页
   * @param[Number]  page 
   * @param[Number]  rows 
   * @param[String]  accountName     //会员名称
   * @param[String]  realName        //真实姓名
   * @param[String]  phoneNumber     //手机号码
   * @param[String]  verifyTimeStart //核销时间 开始
   * @param[String]  verifyTimeEnd   //核销时间 结束
   * @param[String]  verifyId        //核销单号
   * @param[String]  goodsName       //商品名称
   * @param[Number]  businessId      //代理业务ID
   * @param[Number]  jinguId         //金谷Id，就是所属区域 
  */
  getVerifyPage: params => {
    return ajax({ path: '/partnerAgent/getVerifyPage', method: 'post', params });
  },
  /**
   * 获取回购申请
  */
  getBuybackApplyPage: params => {
    return ajax({ path: '/partnerAgent/getBuybackApplyPage', method: 'post'});
  },
  /**
   * 获取回购记录
  */
  getBuybackPage: params => {
    return ajax({ path: '/partnerAgent/getBuybackPage', method: 'post', params});
  },
  /**
   * 获取回购明细
   * @param[String]  id   //回购单号     
  */
  getBuybackDetail: params => {
    return ajax({ path: '/partnerAgent/getBuybackDetail', method: 'post', params});
  },
  /**
   * 回购审核通过
   * @param[Number]  applyId   
   * @param[String]  remark       //备注     
  */
  auditPassBuybackApply: params => {
    return ajax({ path: '/partnerAgent/auditPassBuybackApply', method: 'post', params });
  },
  /**
   * 回购审核拒绝
   * @param[Number]  applyId   
   * @param[String]  remark       //备注     
  */
  auditRefuseBuybackApply: params => {
    return ajax({ path: '/partnerAgent/auditRefuseBuybackApply', method: 'post', params });
  },
  /**
   * 获取提货审核
  */
  getDeliverApplyPage: params => {
    return ajax({ path: '/partnerAgent/getDeliverApplyPage', method: 'post', params});
  },
  /**
   * 获取提货记录
  */
  getDeliverPage: params => {
    return ajax({ path: '/partnerAgent/getDeliverPage', method: 'post', params});
  },
  /**
   * 获取提货明细
   * @param[String]  id   //提货单号     
  */
  getDeliverDetail: params => {
    return ajax({ path: '/partnerAgent/getDeliverDetail', method: 'post', params});
  },
  /**
   * 提货审核通过
   * @param[Number]  applyId   
   * @param[String]  remark       //备注     
  */
  auditPassDeliverApply: params => {
    return ajax({ path: '/partnerAgent/auditPassDeliverApply', method: 'post', params });
  },
  /**
   * 提货审核拒绝
   * @param[Number]  applyId   
   * @param[String]  remark       //备注     
  */
  auditRefuseDeliverApply: params => {
    return ajax({ path: '/partnerAgent/auditRefuseDeliverApply', method: 'post', params });
  },
  /**
   * 核销记录分页
  */
  getVerifyPage: params => {
    return ajax({ path: '/partnerAgent/getVerifyPage', method: 'post', params });
  },

  /**
   * 库存列表、销售列表
   * @param[Boolean]  canVerify  //可核销     
  */
  stockList: params => {
    return ajax({ path: '/stock/list', method: 'post', params });
  },
  /**
   * 库存商品详情
   * @param[String]  skuId  //商品ID     
  */
  stockDetail: params => {
    return ajax({ path: '/stock/detail', method: 'post', params });
  },
  /**
   * 库存记录、详情
   * @param[String]  skuId  //商品ID     
  */
  stockLogs: params => {
    return ajax({ path: '/stock/logs', method: 'post', params });
  },
  /**
   * 核销
   * @param[String]  skuId     //商品ID     
   * @param[Number]  quantity  //数量     
  */
  stockVerify: params => {
    return ajax({ path: '/stock/verify', method: 'post', params });
  },
  /**
   * 核销商品记录
  */
  stockVerifyProduct: params => {
    return ajax({ path: '/stock/verify/product', method: 'post' });
  },
  /**
   * 核销商品详情
  */
  stockVerifyLogs: params => {
    return ajax({ path: '/stock/verify/logs', method: 'post', params  });
  }
}