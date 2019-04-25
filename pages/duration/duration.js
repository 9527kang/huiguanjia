const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentDate: util.formatDate(new Date()),
    today: new Date().getTime(),
    show: false,
    times: [],
    active: null
  },
  clasTab(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  onInput(e) {
    
    this.setData({
      currentDate: e.detail.value
    });
  },
  showTime(e) {
    this.setData({ show: true })
  },
  onClose() {
    this.setData({ show: false })
  },
  timeSure(e) {
    this.setData({
      currentDate: util.formatDate(new Date(e.detail)),
      show: false
    })
  },
  toIndex(e) {
    if(this.data.active === null) {
      wx.showToast({
        title: '请选择会议时长',
        icon: 'none'
      })
      return
    }

    let timeData = this.data.times[this.data.active].name

    let date = this.data.currentDate

    app.globalData.indexData.times = timeData

    // app.globalData.indexData.date = date

    wx.setStorageSync('indexDates',date)
    
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  getData() {
    http.request(api.ApiDemand).then(res => {
      if(res.error_code === 0) {
        this.setData({
          times: res.data.times
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(util.formatDate(new Date()))
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