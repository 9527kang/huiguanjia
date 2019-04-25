const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');
var util = require('../../utils/util');

Page({
  data: {
    imgUrls: [],
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true, // 自动播放
    interval: 5000, // 图片自动播放间隙时间
    duration: 1000, // 轮播d动画时长
    circular: true, // 是否循环播放
    indicatorColor: '#fff', // 面板指示点背景色
    indicatorActiveColor: '#FF6969', // 面板指示点选中背景色
    demand: {},
    ensure: [],
    meeting: [],
    choice: [],
    hot: [],
    indexDates: '',
    indexType: null,
    indexTimes: null,
    indexNumber: null,
    indexMoney: null,
    indexMent: null,
    indexCity: null,
    indexTel: '',
    indexBei: ''
  },
  toCitys() {
    wx.navigateTo({
      url: '/pages/city/city'
    })
  },
  toDetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  toPublish() {

    let dates = wx.getStorageSync('indexDates')

    let {
      indexType,
      indexTimes,
      indexNumber,
      indexMoney,
      indexMent,
      indexTel,
      indexBei
    } = this.data

    if (indexType === '会议类型') {
      wx.showToast({
        title: '会议类型不能为空',
        icon: 'none'
      })
      return
    } else if (indexTimes === '会议时长') {
      wx.showToast({
        title: '会议时长不能为空',
        icon: 'none'
      })
      return
    } else if (indexNumber === '参加人数') {
      wx.showToast({
        title: '参加人数不能为空',
        icon: 'none'
      })
      return
    } else if (indexMoney === '会议预算') {
      wx.showToast({
        title: '会议预算不能为空',
        icon: 'none'
      })
      return
    } else if (indexMent === '会议需求') {
      wx.showToast({
        title: '会议需求不能为空',
        icon: 'none'
      })
      return
    } else if (indexTel === '') {
      wx.showToast({
        title: '号码不能为空',
        icon: 'none'
      })
      return
    } else if (!util.verifyPhone(indexTel - 0)) {
      wx.showToast({
        title: '号码格式不正确',
        icon: 'none'
      })
      return
    } else if (indexBei === '') {
      wx.showToast({
        title: '备注不能为空',
        icon: 'none'
      })
      return
    }

    // let {type,times,dates,number,money,ment,city,phone,content} = {indexType,indexTimes,indexDates,indexNumber,indexMoney,indexMent,indexCity,indexTel,indexBei}

    http.request(api.ApiSaveDemand, {
      type: indexType,
      times: indexTimes,
      dates,
      number: indexNumber,
      money: indexMoney,
      ment: indexMent,
      city: wx.getStorageSync('locationCity'),
      phone: indexTel,
      content: indexBei
    }, "POST").then(res => {
      if (res.error_code === 0) {
        wx.navigateTo({
          url: '/pages/publish/publish',
        })
      }else if(res.error_code === 1) {
        wx.showToast({
          title: res.msg
        })
        this.onLoad()
      }
    })
    return
  },
  onTel(e) {
    this.setData({
      indexTel: e.detail
    })
  },
  onBei(e) {
    this.setData({
      indexBei: e.detail
    })
  },
  getData() {

    http.request(api.ApiIndex).then(res => {
      // console.log(res)
      if (res.error_code === 0) {
        this.setData({
          imgUrls: res.data.lb,
          demand: res.data.demand,
          ensure: res.data.ensure,
          meeting: res.data.meeting,
          choice: res.data.choice,
          hot: res.data.hot
        })
      }

    })
    

  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function (options) {
    this.getData()
    wx.setNavigationBarTitle({
      title: '会管家'
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShow: function () {
    // 获取当前城市
    http.request(api.ApiLocation).then(res => {
      // console.log(res)
      this.setData({
        indexCity: wx.getStorageSync('locationCity') || res.result.ad_info.city,
        indexType: app.globalData.indexData.type || '会议类型',
        indexTimes: app.globalData.indexData.times || '会议时长',
        indexNumber: app.globalData.indexData.number || '参加人数',
        indexMoney: app.globalData.indexData.money || '会议预算',
        indexMent: app.globalData.indexData.ment || '会议需求'
      })
    })
  }
})