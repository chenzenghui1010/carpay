/**
 * Created by yan on 20/02/2017.
 */
/**
 * Created by Sorrow.X on 2016/9/20.
 * beacons.js  蓝牙功能模块
 */


export class WxManager {

  static pay(appId, timeStamp, nonceStr, packagename, signType, paySign, success, failed) {

    WeixinJSBridge.invoke('getBrandWCPayRequest', {
        "appId":appId,     //公众号名称，由商户传入
        "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数
        "nonceStr":nonceStr, //随机串
        "package":packagename,
        "signType":signType,         //微信签名方式：
        "paySign":paySign //微信签名
      }, res => {

        if (res.err_msg === 'get_brand_wcpay_request:ok') {

          success(res)
        }
        else {

          failed(res)
        }
      }
    )
  }
}
