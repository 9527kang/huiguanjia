const app = getApp()
var http = require('../../http/request')
var api = require('../../config/api')
var util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cashData: {},
    moneyNum: ''
  },
  getData() {
    http.request(api.ApiUserCash).then(res => {
      if(res.error_code === 501) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/login_choice/login_choice'
          })
        },1000)
      }else if(res.error_code === 0) {
        this.setData({
          cashData: res.data
        })
      }
    })
  },
  drawMoney(e) {
    this.setData({
      moneyNum: e.detail
    })
  },
  drawBtn() {
    let money = this.data.moneyNum
    
    // let content = wx.getStorageInfoSync('content')

    http.request(api.ApiUserCashSave,{money,content},'POST').then(res => {
      if(res.error_code === 0) {
        wx.showToast({
          title: res.msg,
          icon: 'success'
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/index/index'
          })
            
        },1000)
      }else if(res.error_code === 1) {
        wx.showToast({
          title: res.msg,
          icon: 'success'
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/index/index'
          })
            
        },1000)
      }else if(res.error_code === 2) {
        wx.showToast({
          title: res.msg,
          icon: 'success'
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/index/index'
          })
            
        },1000)
      }else if(res.error_code === 3) {
        wx.showToast({
          title: res.msg,
          icon: 'success'
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/index/index'
          })
            
        },1000)
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