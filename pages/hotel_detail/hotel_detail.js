const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/image/detail_banner.png',
      '/image/detail_banner.png',
      '/image/detail_banner.png'
    ],
    current: 1,
    indicatorDots: false, // 是否显示面板指示点
    autoplay: true, // 自动播放
    interval: 5000, // 图片自动播放间隙时间
    duration: 1000, // 轮播d动画时长
    circular: true, // 是否循环播放
    room: {}
  },
  changeBanner(e) {
    this.setData({
      current: e.detail.current + 1
    })
  },
  getData(e) {
    http.request(api.ApiRoomDetail+'?id='+e).then(res => {
      if(res.error_code === 0) {
        wx.setNavigationBarTitle({
          title: res.data.room.room_name
        })
        this.setData({
          imgUrls: res.data.banner,
          room: res.data.room
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})