
const ajax = require('../../utils/ajax.js');

module.exports = {
  /**
   * 我的预约列表
   * @param {Number}  page
   * @param {Number}  rows
  */
  reservationQuery: params => {
    return ajax({ path: '/static/data/reservation.js', method: 'get', params });
  },
  /**
   * 我的新生币列表
   * @param {Number}  page
   * @param {Number}  rows
  */
  currencyQuery: params => {
    return ajax({ path: '/static/data/currency.js', method: 'get', params });
  }
}