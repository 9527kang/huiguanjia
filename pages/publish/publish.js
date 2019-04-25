// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [{
        text: '预定成功',
        desc: ''
      },
      {
        text: '闪电推荐',
        desc: '专家顾问将于30分钟内为您免费匹配场地'
      },
      {
        text: '等待沟通',
        desc: '工作时间发布，专业场地顾问15分钟内联系你'
      },
      {
        text: '发布需求',
        desc: '需求已提交给会管家客服'
      }
    ]
  },
  backIndex() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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