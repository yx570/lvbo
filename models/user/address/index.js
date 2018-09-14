
const ajax = require('../../../utils/ajax.js');

module.exports = {
  /**
   * 获取收货地址列表
  */
  list: params => {
    return ajax({ path: '/receiver/list', method: 'post' });
  },
  /**
   * 添加收货地址
   * @param[String]  address     详细地址
   * @param[String]  consignee   收货人
   * @param[Boolean] isDefault   是否默认
   * @param[String]  phone       手机号
   * @param[Number]  regionId    地区
   * @param[String]  zipCode     邮编
  */
  add: params => {
    return ajax({ path: '/receiver/add', method: 'post', params, contentType:"application/json" });
  },
  /**
   * 删除收货地址
   * @param[Number]  id  
  */
  delete: params => {
    return ajax({ path: '/receiver/delete', method: 'post', params });
  },
  /**
   * 修改收货地址
   * @param[Number]  id          
   * @param[String]  address     详细地址
   * @param[String]  consignee   收货人
   * @param[Boolean] isDefault   是否默认
   * @param[String]  phone       手机号
   * @param[Number]  regionId    地区
   * @param[String]  zipCode     邮编
  */
  update: params => {
    return ajax({ path: '/receiver/update', method: 'post', params });
  },
  /**
   * 设置默认收货地址
   * @param[Number]  id  
  */
  default: params => {
    return ajax({ path: '/receiver/default', method: 'post', params });
  }
}