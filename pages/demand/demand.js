const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ment: [],
    result: []
  },
  getData() {
    http.request(api.ApiDemand).then(res => {
      // console.log(res)
      if(res.error_code === 0) {
        this.setData({
          ment: res.data.ment
        })
      }
      
    })
  },
  onChange(event) {
    this.setData({
      result: event.detail
    })
  },
  toggle(event) {
    const { id } = event.currentTarget.dataset;
    const checkbox = this.selectComponent(`.checkboxes-${id}`);
    checkbox.toggle();
  },
  noop() {},
  toIndex(e) {
    
    let result = this.data.result
    app.globalData.indexData.ment = result.join('+')
    wx.switchTab({
      url: '/pages/index/index'
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