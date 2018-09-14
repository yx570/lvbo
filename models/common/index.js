
const ajax = require('../../utils/ajax.js');

module.exports = {
  /**
   * 获取省级
  */
  getRegionProvince: (params, loading = false) => {
    return ajax({ path: '/region/province', method: 'post', loading });
  },
  /**
   * 获取下级列表
   * @param[Number]  regionId  
  */
  getRegionSubs: (params, loading = false) => {
    return ajax({ path: '/region/subs', method: 'post', params, loading });
  },
  /**
   * 图片上传
   * @param[File]    filePath       
   * @param[String]  name       
   * @param[Object]  formData { test:"123" }       
  */
  uploadImage: params => {
    return ajax({ path: '/upload/image', requestType:'uploadFile', params });
  },
  /**
   * 物流公司列表
  */
  corpList: (params, loading = false) => {
    return ajax({ path: '/delivery-corp/list', method: 'post', loading });
  },
}