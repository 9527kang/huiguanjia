// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: false,
    turn: false,
    filter: false,
    itemsArea: [{
      // 导航名称
      text: '不限',
      // 禁用选项
      disabled: false,
      // 该导航下所有的可选项
      children: [{
        // 名称
        text: '金水区',
        // id，作为匹配选中状态的标识
        id: 1,
        // 禁用选项
        disabled: false
      },
      {
        text: '中原区',
        id: 2
      }
      ]
    }, {
      text: '金水区',
      children: [{
        text: '经三路沿线',
        id: 1
      },
      {
        text: '文化路',
        id: 2
      },
      {
        text: '金水路',
        id: 3
      },
      {
        text: '花园北路',
        id: 4
      }
      ]
    }, {
      text: '中原区',
      children: [{
        text: '陇海路',
        id: 1
      },
      {
        text: '大学路',
        id: 2
      },
      {
        text: '建设路',
        id: 3
      }
      ]
    }],
    mainActiveIndex: 0,
    activeId: 1,
    columns: ['推荐顺序', '低价优先', '高价优先', '好评优先', '距离最近'],
    places: [{
      id: 102,
      label: '五星/顶级'
    }, {
      id: 123,
      label: '经济型'
    }, {
      id: 6,
      label: '度假村'
    }],
    peoples: [{
      id: 2,
      label: '10-50人'
    }, {
      id: 4,
      label: '50-100人'
    }, {
      id: 1,
      label: '100-150人'
    }]
  },
  showArea(e) {
    this.setData({
      area: true
    })
  },
  showTurn(e) {
    this.setData({
      turn: true
    })
  },
  showFilter(e) {
    this.setData({
      filter: true
    })
  },
  onClose(e) {
    this.setData({
      area: false,
      turn: false,
      filter: false
    })
  },
  onClickNav({
    detail = {}
  }) {
    this.setData({
      mainActiveIndex: detail.index || 0
    });
  },

  onClickItem({
    detail = {}
  }) {
    this.setData({
      activeId: detail.id
    });
  },
  onChange(e) {
    const { picker, value, index } = e.detail;
    console.log(e.detail.value)
  },

  getid(e) {
    console.log(e.detail)
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