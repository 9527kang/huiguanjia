const app = getApp()
var http = require('../../http/request')
var api = require('../../config/api')
var util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    drawData: []
  },
  getData() {
    http.request(api.ApiApply).then(res => {
      if(res.error_code === 501) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/login_choice/login_choice'
          })    
        },1000)
      }else if(res.error_code === 0) {
        res.data.forEach(item => {
          item.time = util.formatTime(new Date(item.time*1000))
        })
        this.setData({
          drawData: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
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