// pages/login_choice/login_choice.js
var http = require('../../http/request');
var api = require('../../config/api');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onGetUserInfor(e) {
    let { nickName: nickname, avatarUrl: image } = e.detail.userInfo
    
    wx.login({
      success(e) {
        let code = e.code
        console.log(code,nickname,image)
        http.request(api.ApiLogin, {nickname,image,code}, 'POST').then(res => {
          // console.log(res)

          // wx.setStorageSync('uid', res.data.uid)
          
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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