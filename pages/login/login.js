const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: null,
    pwd: null
  },
  setPhone(e) {
    this.setData({
      phone: e.detail
    })
  },
  setPwd(e) {
    this.setData({
      pwd: e.detail
    })
  },
  toRegist() {
    wx.navigateTo({
      url: '/pages/regist/regist',
    })
  },
  toPwd() {
    wx.navigateTo({
      url: '/pages/forget/forget',
    })
  },
  loginBtn() {
    let {phone,pwd} = this.data

    if(phone === '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    } else if(!util.verifyPhone(phone - 0)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none'
      })
      return
    } else if(pwd === '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return
    } else {
      http.request(api.ApiLoginIndex,{phone,pwd},'POST').then(res => {
        if(res.error_code === 0) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/index/index'
            })              
          },1500)
        }else if(res.error_code === 1){
          wx.showToast({
            title: res.msg + '，请重新登录',
            icon: 'none'
          })
          return
        }
      })
    }
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