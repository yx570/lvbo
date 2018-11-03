
const ajax = require('../../utils/ajax.js');
module.exports = {
  //加入购物车
  // p.product_id
  // p.sku_name
  // p.sku_num
  additem: params => {
    return ajax({ path: '/Api/Order/preScheduling', method: 'post', params });
  },
  //购物车列表
  cartlist: params => {
    return ajax({
      path: '/static/data/cartList.js', method: 'post', params,loading: false});
  },
  //立即购买加入购物车
  // "id": "",   //skuId
  // "quantity": 1  //数量
  cartbuy: params => {
    return ajax({ path: '/static/data/cartList.js', method: 'post', params });
  },
  //删除
  // "id": "",   //skuId
  remove: params => {
    return ajax({ path: '/static/data/cartList.js', method: 'post', params });
  },
  //更改数量
  // "id": "",   //skuId
  // "quantity": 1  //数量
  change_quantity: params => {
    return ajax({ path: '/static/data/cartList.js', method: 'post', params });
  },
  //更改选中状态
  // "ids":[1,2,3],   //skuId
  // "selected": true  //选中状态
  cart_select: params => {
    return ajax({ path: '/static/data/cartList.js', method: 'post', params });
  },
}