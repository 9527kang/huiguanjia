const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    current: 1,
    indicatorDots: false, // 是否显示面板指示点
    autoplay: true, // 自动播放
    interval: 5000, // 图片自动播放间隙时间
    duration: 1000, // 轮播d动画时长
    circular: true, // 是否循环播放
    hotel: {},
    show: false,
    con_room: {},
    guset_room:{},
    peoplesActive: 0,
    active: null,
    actives: null,
    number: null,
    ment: null,
    dates: null,
    phone: null,
    hid: null,
    checkNum: [{
      id: 1,
      name: '10-30'
    },{
      id: 2,
      name: '20-30'
    },{
      id: 3,
      name: '30-40'
    }],
    checkMent: [{
      id: 1,
      name: '煮熟'
    },{
      id: 2,
      name: '开门'
    },{
      id: 3,
      name: '备注'
    }],
    checkLb: {}
  },
  checkPrice() {
    this.setData({
      show: true
    })
    http.request(api.ApiBuyOrder).then(res => {
      if(res.error_code === 501) {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
        setTimeout(function(){
          wx.reLaunch({
            url: '/pages/login_choice/login_choice'
          })
        },1000)
      }else if(res.error_code === 0) {
        this.setData({
          checkNum: res.data.number,
          checkMent: res.data.ment,
          checkLb: res.data.lb
        })
      }
    })
    
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  showMore() {
    wx.showToast({
      title: '显示更多',
      icon: 'none'
    })
  },
  changeBanner(e) {
    this.setData({
      current: e.detail.current + 1
    })
  },  
  getData(e) {
    http.request(api.ApiDetail+'?id='+e).then(res => {
      if(res.error_code === 0) {
        wx.setNavigationBarTitle({
          title: res.data.hotel.name,
        })
        this.setData({
          imgUrls: res.data.banner,
          hotel: res.data.hotel,
          con_room: res.data.con_room,
          guset_room: res.data.guset_room
        })
      }
    })
    
  },
  changeClas(e) {
    let {id,name} = e.currentTarget.dataset,
    checkNum = this.data.checkNum,
    index = checkNum.findIndex(item => item.id === id),
    active = this.data.active
  
    if (active === index) return
    this.setData({
      active: index,
      number: name
    })

  },
  changeClass(e) {
    let {id,name} = e.currentTarget.dataset,
    checkNum = this.data.checkNum,
    index = checkNum.findIndex(item => item.id === id),
    actives = this.data.actives
  
    if (actives === index) return
    this.setData({
      actives: index,
      ment: name
    })

  },
  meetingDates(e) {
    this.setData({
      dates: e.detail
    })
  },
  meetingPhone(e) {
    this.setData({
      phone: e.detail
    })
  },
  sendTo() {
    let {hid,rid,dates,number,ment,phone} = this.data

    if(dates === null) {
      wx.showToast({
        title: '会议时间不能为空',
        icon: 'none'
      })
      return
    }else if(number === null) {
      wx.showToast({
        title: '请选择参与人数',
        icon: 'none'
      })
      return
    }else if(ment === null) {
      wx.showToast({
        title: '请选择其他需求',
        icon: 'none'
      })
      return
    }else if(phone === null) {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    }else if(!util.verifyPhone(phone - 0)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none'
      })
      return
    }else {
      http.request(api.ApiBuySave,{hid,rid,dates,number,ment,phone},'POST').then(res => {
        if(res.error_code === 0) {
          wx.showToast({
            title: res.msg
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/index/index'
            })            
          },1500)
        }else if(res.error_code === 1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/index/index'
            })            
          },1500)
        }else if(res.error_code === 2) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/index/index'
            })            
          },1500)
        }
      })
    }

    
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(options.id)
    this.setData({
      hid: options.id
    })
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