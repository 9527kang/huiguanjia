const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: [],
    currentCity: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
    // 获取当前城市
    http.request(api.ApiLocation).then(res => {
      // console.log(res)
      this.setData({
        currentCity: res.result.ad_info.city
      })
    })
  },
  getData() {
    http.request(api.ApiDemand).then(res => {
      // console.log(res)
      if(res.error_code === 0) {
        this.setData({
          city: res.data.city
        })
      }
      
    })
  },
  toIndex(e) {

    let city = e.currentTarget.dataset.name
    let cid = e.currentTarget.dataset.id
    
    wx.setStorageSync('locationCity', city)
    wx.setStorageSync('locationCid', cid)    

    wx.navigateBack({
      delta: 1
    });
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})