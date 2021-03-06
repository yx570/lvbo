/**
 * 公共方法ajax
 * @method ajax
 * @param[String] url 请求api baseUrl
 * @param[String] path 请求路径
 * @param[String] method 请求方法 默认GET
 * @param[Object] header 请求头
 * @param[Boolean] loading 是否需要loading 默认true
 * @param[Boolean] auth 是否需要token验证 默认true
 * @param[String] contentType 默认application/x-www-form-urlencoded
 * @param[String] requestType 微信请求类型 默认request
*/

const { baseUrl } = require('../config/url.js');
const { absolutePath } = require('./path.js');


module.exports = (_options = {}) => {
  return new Promise((resolve, reject) => {

    // 本地调试代码
    if (!!~_options.path.indexOf('.js')) {
      const res = require('..' + _options.path);
      resolve(res)
      return false
    }
    // 本地调试代码结束

    let {
      url = baseUrl,
      path = '',
      method = 'GET',
      header,
      params = {},
      loading = true,
      showToast = true,
      auth = true,
      contentType = 'application/x-www-form-urlencoded',
      requestType = 'request'
    } = _options;
    let _header = Object.assign({}, {
      "content-type": contentType
    }, header);
    auth && (params.token = wx.getStorageSync("token"));
    let options = {
      url: url + path,
      header: _header,
      success: response => {
        let data = response.data || {};
        loading && wx.hideLoading();
        switch (data.status) {
          case "success":
            resolve(data);
            break;
          default:
            wx.showToast({
              title: data.msg || data.dataList.errorMsg || '加载失败',
              icon: 'none',
              duration: 2000
            })
            // showToast && wx.showToast({
            //   title: data.dataList.errorMsg || '加载失败',
            //   icon: 'none',
            //   image: absolutePath('static/images/error.png'),
            //   duration: 2000
            // });
            reject(response);
            break;
        }
      },
      fail: error => {
        //   loading && wx.hideLoading();
        //   console.log(error);
        //   showToast && wx.showToast({
        //     title: error,
        //     icon: 'none',
        //     duration: 2000
        //   });
        //   reject(error);
      },
      complete: () => {
        // loading && wx.hideLoading();
        wx.hideNavigationBarLoading();
        // wx.stopPullDownRefresh();
      }
    };

    loading && wx.showLoading({ title: "加载中" });

    switch (options.requestType) {
      case 'uploadFile':
        if (params) {
          options.filePath = params.filePath;
          options.name = params.name || 'fileName';
          params.formData && (options.formData = params.formData);
        }
        return wx.uploadFile(options);
        break;
      case 'downloadFile':
        return wx.downloadFile(options);
        break;
      case 'request':
      default:
        options.method = method.toUpperCase();
        params && (options.data = params);
        wx.request(options);
        break;
    }
  });
} 