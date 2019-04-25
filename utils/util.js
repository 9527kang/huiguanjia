const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function location() {
  // 实例化腾讯位置服务里面微信小程序JS SDK的API核心类 地址http://lbs.qq.com/qqmap_wx_jssdk/qqmapwx.html
  var qqmapsdk = new qqmap({
    key: 'I7LBZ-CD4KD-DMN4Q-P5FYP-V2DOV-PWBM2'
  });
  return new Promise((resolve) => {
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            const address = res.result.address
            resolve(address)
          },
          fail() {
            resolve('')
          }
        })
      }
    })
  })
}

/**
 * 验证手机号前两位和长度.
 * @param {Number} phone
 * @returns {boolean}
 */
const verifyPhone = phone => {
  let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(phone)
}

const showToast = (msg = '提示语', icon = 'success', cb) => {
  wx.showToast({
    title: msg,
    icon: icon,
    success: function () {
      typeof cb === 'function' && cb()
    }
  })
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  location: location,
  verifyPhone: verifyPhone,
  showToast: showToast
}
