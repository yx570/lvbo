
const ajax = require('../../../utils/ajax.js');

module.exports = {
  /**
   * 获取个人信息
  */
  info: params => {
    return ajax({ path: '/member/info', method: 'post', loading: false });
  },
  /**
   * 工作任务统计
  */
  tasks: params => {
    return ajax({ path: '/Api/Technician/myWorkSheet', method: 'post', auth: true, params, loading: true });
  },

  tecComment: params => {
    return ajax({ path: '/Api/Technician/getTechnicianReviewList', method: 'post' });
    
  }
}