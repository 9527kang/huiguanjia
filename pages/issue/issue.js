const app = getApp()
var http = require('../../http/request')
var api = require('../../config/api')
var util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hid: null,
    content: '',
    number: 5
  },
  saveContent(e) {
    this.setData({
      content: e.detail
    })
  },
  rateChange(e) {
    this.setData({
      number: e.detail
    })
  },
  issueBtn() {
    let {hid,number,content} = this.data

    if(content === '') {
      wx.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      })
      return
    }

    http.request(api.ApiApply,{hid,number,content},'POST').then(res => {
      if(res.error_code === 0) {
        wx.showToast({
          title: '发表成功'
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/order/order'
          })
            
        },1000)
      }else if(res.error_code === 1) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/order/order'
          })
            
        },1000)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hid: options.hid
    })
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