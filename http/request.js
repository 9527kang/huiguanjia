const request = (url, data, method = 'GET') => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      header: { token: '50a00a9b8d3402ed4f1b3ed4b890294b', uid: wx.getStorageSync('uid') },
      data: data,
      success: res => {
        if (res.statusCode === 200) {
          let resData = res.data
          resolve(resData)
        } else {
          reject(res)
        }
        // if (res.statusCode === 200) {
        //   let resData = res.data
        //   if (resData.error_code === 0) {
            
        //   } else {
        //     resolve(resData.data)
        //   }
        // } else {
        //   reject(res)
        // }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

module.exports = {
  request
}