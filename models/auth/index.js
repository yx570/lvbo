
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
  resister: params => {
    return ajax({ path: '/Api/Customer/addCustomer', method: 'post', params, auth:false });
  },
  /**
   * 登出
  */
  logout: params => {
    return ajax({ path: '/logout', method: 'post' });
  },
  
  getUserInfo: params => {
    return ajax({ path: '/Api/Customer/getCustomerInfo', method: 'post', params });
  },
  

  /**
   * 修改密码
   * @param[String]  password 
   * @param[String]  newPassword 
  */
  modifyPassword: params => {
    return ajax({ path: '/password', method: 'post', params });
  },
  /**
   * 忘记密码，获取账号token
   * @param[String]  cellPhone 
  */
  getAccountToken: params => {
    return ajax({ path: '/sms-code/forget-pwd', method: 'post', params });
  },
  /**
   * 忘记密码，重置密码
   * @param[String]  token 
   * @param[String]  code 
   * @param[String]  password 
  */
  resetPassword: params => {
    return ajax({ path: '/repassword', method: 'post', params });
  },
  /**
   * 修改交易密码
  */
  updateTradePwd: params => {
    return ajax({ path: '/sms-code/trade-pwd', method: 'post', params });
  },
  /**
   * 修改手机号-旧手机号获取验证码
  */
  smsCodePhoneOld: params => {
    return ajax({ path: '/sms-code/phone-old', method: 'post' });
  },
  /**
   * 修改手机号-新手机号获取验证码
   * @param[String]  cellPhone 
  */
  smsCodePhoneNew: params => {
    return ajax({ path: '/sms-code/phone-new', method: 'post', params });
  },
  /**
   * 旧手机号校验
   * @param[String]  code 
  */
  phoneValidate: params => {
    return ajax({ path: '/member/phone/validate', method: 'post', params });
  },
  /**
   * 绑定新手机号
   * @param[String]  cellPhone 
   * @param[String]  code 
  */
  phoneChange: params => {
    return ajax({ path: '/member/change-phone', method: 'post', params });
  }
}