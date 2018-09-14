
const ajax = require('../../../utils/ajax.js');

module.exports = {
  /**
   * 钱包统计信息
  */
  deposit: params => {
    return ajax({ path: '/deposit', method: 'post' });
  },
  /**
   * 开通钱包
   * @param[String]  tradePassword
  */
  establish: params => {
    return ajax({ path: '/deposit/establish', method: 'post', params });
  },
  /**
   * 明细列表
   * @param[Number]  type   
   * @param[String]  start 
   * @param[String]  end 
  */
  details: params => {
    return ajax({ path: '/deposit/details', method: 'post', params });
  },
  /**
   * 明细类型
  */
  detailstype: params => {
    return ajax({ path: '/deposit/details/type', method: 'post', params });
  },
  /**
   * 重置支付密码  
   * @param[String]  tradePassword 
   * @param[String]  code 
  */
  resetPassword: params => {
    return ajax({ path: '/deposit/reset-password', method: 'post', params });
  },
  /**
   * 申请提现
   * @param[String]  tradePassword   
   * @param[Number]  amount 
   * @param[Number]  cardId 
  */
  withdrawRequest: params => {
    return ajax({ path: '/deposit/withdraw-request', method: 'post', params });
  },
  /**
   * 提现记录
  */
  withdrawHistory: params => {
    return ajax({ path: '/deposit/withdraw-history', method: 'post' });
  },
  /**
   * 获取绑定的银行卡
  */
  bankCards: params => {
    return ajax({ path: '/user-bank/get', method: 'post' });
  },
  /**
   * 绑定银行卡
   * @param[String]  bankName 
   * @param[String]  accountName 
   * @param[String]  accountNumber 
   * @param[String]  identityCard 
   * @param[String]  cellPhone 
  */
  bindBankCard: params => {
    return ajax({ path: '/user-bank/set', method: 'post', params });
  },
  /**
   * 解除绑定银行卡
   * @param[Number]  id 
   * @param[String]  tradePassword 
  */
  unbindBankCard: params => {
    return ajax({ path: '/user-bank/unbind', method: 'post', params });
  },
  /**
   * 获取提现设置
  */
  withdrawSetting: params => {
    return ajax({ path: '/deposit/withdraw-setting', method: 'post', params });
  }
}