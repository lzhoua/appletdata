const axios = require('axios')

const resCode = {
  SUCCESS: 0,
  FAIL: -1
}

/**
 * 获取token
 * @param {string} appId 小程序appId
 * @param {string} appSecret 小程序appSecret
 */
async function getAccessToken (appId, appSecret) {
  try {
    const res = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`)
    const { errcode, access_token, errmsg } = res.data
    if (access_token) {
      return { code: resCode.SUCCESS, access_token, msg: 'success' }
    }
    return {
      code: resCode.FAIL,
      msg: {
        '41002': 'appId与appSecret不匹配',
        '40001': 'AppSecret 错误或者 AppSecret 不属于这个小程序，请开发者确认 AppSecret 的正确性',
        '40013': '不合法的 AppID，请开发者检查 AppID 的正确性，避免异常字符，注意大小写',
        '-1': '系统繁忙，请稍候再试'
      }[String(errcode)] || errmsg
    }
  } catch (error) {
    return { code: resCode.FAIL, msg: error}
  }
}

/**
 * 获取访问信息
 * @param {string} access_token 
 * @param {string} date 日期 20200618
 */
async function getVisitTrend (access_token, date) {
  try {
    const res = await axios.post(`https://api.weixin.qq.com/datacube/getweanalysisappiddailyvisittrend?access_token=${access_token}`, {
      begin_date: date,
      end_date: date
    })
    const { list = [], errmsg } = res.data || {}
    if (list.length) {
      return { code: resCode.SUCCESS, data: list[0] }
    }
    return { code: resCode.FAIL, msg: errmsg }
  } catch (error) {
    return { code: resCode.FAIL, msg: error}
  }
}

async function getPerformance (access_token, date, type) {
  try {
    
  } catch (error) {
    
  }
}

module.exports = {
  getAccessToken,
  getVisitTrend
}