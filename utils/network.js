/**
 * Created Jam 2020-04
 * 基于Promise的网络请求库
 */
import {
  API_ROOT
} from '../config/appConfig';
const app = getApp();
/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头 选填
 * @returns {Promise}
 */
const request = function (config) {
  const isHeader = config.header
  const headers = {}
  headers['Content-Type'] = 'application/json'
  if (isHeader) {
    headers['Authorization'] = 'Bearer ' + wx.getStorageSync('token')
  }
  //Promise
  return new Promise((resolve, reject) => {
    const response = {};
    wx.request({
      method: config.method,
      url: `${API_ROOT}${config.url}`,
      data: config.data,
      header: headers,
      success: (res) => response.success = res.data,
      fail: (error) => response.fail = error,
      complete(res) {
        const code = res.statusCode
        //判断状态码
        switch (code) {
          case 200:
            resolve(response.success)
            break;
          case 401:
            app.wxLogin()
            reject(response.fail)
            break;
          case 500:
            wx.showToast({
              title: '服务器内部错误！',
              icon: 'none',
              duration: 2000
            })
            reject(response.fail)
            break;
          default:
            console.log(res)
            wx.showToast({
              title: `请求出错，请重试`,
              icon: 'none',
              duration: 2000
            })
            reject(response.fail)
        }
      }
    });
  });
}
export default request