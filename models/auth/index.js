
const ajax = require('../../utils/ajax.js');
module.exports = {
  /**
   * 登录
   * @param[String]  username   账号
   * @param[String]  password   密码
   * @param[String]  code       小程序登录code
  */
  login: params => {
    return ajax({ path: '/Api/Common/login', method: 'post', params, auth:false });
  },
  getUserInfo: params => {
    return ajax({ path: '/Api/Common/getUserInfo', method: 'post', params });
  },
  save: params => {
    return ajax({ path: '/Api/Common/saveUserInfo', method: 'post', params });
  }
}