const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: false,
    turn: false,
    filter: false,
    hotelData: [],
    shunxu: '推荐顺序',
    quyu: '区域',
    shaixuan: '分类筛选',
    mainActiveIndex: 0,
    activeId: 1,
    columns: ['推荐顺序', '低价优先', '高价优先'],
    places: [],
    peoples: [],
    areas: [],
    areass: [],
    qid: null,
    tid: null,
    aid: null,
    nid: null,
    mid: null,
    sort: null
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
  onCity(e) {
    const {
      picker,
      value,
      index
    } = e.detail
    this.setData({
      quyu: e.detail.value,
      area: false
    })
  },
  onChange(e) {
    let sort = null
    
    this.setData({
      shunxu: e.detail.value,
      turn: false
    })
    if(e.detail.value === '低价优先') {
      sort = '0'
    }else if(e.detail.value === '高价优先') {
      sort = '2'
    }

    let cid = wx.getStorageSync('locationCid')

    http.request(api.ApiHotelSearchLister, {
      cid,
      sort
    }, 'POST').then(res => {
      if(res.error_code === 0) {
        this.setData({        
          hotelData: res.data
        })
      }  
    })
  },
  changeClas(e) {
    let oid = e.currentTarget.dataset.oid,
      areas = this.data.areas,
      index = areas.findIndex(item => item.oid === oid),
      active = this.data.active
    if (active === index) return
    this.setData({
      active: index,
      qid: oid,
      area: false
    })
    http.request(api.ApiHotelSearchLister, {
      cid,
      qid
    }, 'POST').then(res => {
      if(res.error_code === 0) {
        this.setData({        
          hotelData: res.data
        })
      }
    })
  },
  getTid(e) {
    this.setData({
      tid: e.detail
    })
  },
  getAid(e) {
    this.setData({
      aid: e.detail
    })
  },
  getNid(e) {
    this.setData({
      nid: e.detail
    })
  },
  getMid(e) {
    this.setData({
      mid: e.detail
    })
  },
  souKeywords(e) {
    let cid = wx.getStorageSync('locationCid')
    let keywords = e.detail
    http.request(api.ApiHotelSearchLister, {
      cid,
      keywords
    }, 'POST').then(res => {
      if(res.error_code === 0) {
        this.setData({        
          hotelData: res.data
        })
      }
    })
  },
  onSure() {
    let {tid,aid,nid,mid} = this.data

    if(tid === null) {
      wx.showToast({
        title: '请选择场地类型',
        icon: 'none'
      })
      return
    } else if (aid === null) {
      wx.showToast({
        title: '请选择会场面积',
        icon: 'none'
      })
      return
    } else if (nid === null) {
      wx.showToast({
        title: '请选择容纳人数',
        icon: 'none'
      })
      return
    } else if (mid === null) {
      wx.showToast({
        title: '请选择参考价格',
        icon: 'none'
      })
      return
    } else {
      let cid = wx.getStorageSync('locationCid')

      http.request(api.ApiHotelSearchLister, {cid,tid,aid,nid,mid}, 'POST').then(res => {
        if(res.error_code === 0) {
          this.setData({
            hotelData: res.data
          })
        }
      })
    }
    this.setData({
      filter: false
    })
  },
  getData() {
    let addr = wx.getStorageSync('locationCity')
    http.request(api.ApiNearby,{addr},'POST').then(res => {
      if(res.error_code === 0) {
        this.setData({
          hotelData: res.data
        })
      }
    })

    let cid = wx.getStorageSync('locationCid')

    http.request(api.ApiHotelSearch + '?cid=' + cid).then(res => {
      if (res.error_code === 0) {
        this.setData({
          areas: res.data.city,
          places: res.data.type,
          areass: res.data.area,
          peoples: res.data.num,
          prices: res.data.money
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
    // 获取当前城市
    http.request(api.ApiLocation).then(res => {
      // console.log(res)
      this.setData({
        currentCity: wx.getStorageSync('locationCity') || res.result.ad_info.city
      })
    })
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