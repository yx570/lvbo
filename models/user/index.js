
const ajax = require('../../utils/ajax.js');

module.exports = {
  /**
   * 我的预约列表
   * @param {Number}  page
   * @param {Number}  rows
  */
  reservationQuery: params => {
    return ajax({ path: '/static/data/reservation.js', method: 'get', params });
  }
}