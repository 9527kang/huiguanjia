const app = getApp()
var http = require('../../http/request')
var api = require('../../config/api')
var util = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '我的申请'
      },
      {
        text: '已接收'
      },
      {
        text: '正在审核'
      },
      {
        text: '成功'
      }
    ],
    zanData: [{
      name: '酒店'
    },{
      name: '会议'
    },{
      name: '发布'
    }],
    show: false,
    genre: [],
    tips: {},
    username: '',
    idcode: '',
    names: '',
    addr: '',
    types: '',
    phone: ''
  },
  showType() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  getData() {
    http.request(api.ApiApply).then(res => {
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
          genre: res.data.genre,
          tips: res.data.tips
        })
      }
    })
  },
  setType(e) {
    this.setData({
      types: e.currentTarget.dataset.name,
      show: false
    })
  },
  usernameChange(e) {
    this.setData({
      username: e.detail
    })
  },
  idcodeChange(e) {
    this.setData({
      idcode: e.detail
    })
  },
  namesChange(e) {
    this.setData({
      names: e.detail
    })
  },
  addrChange(e) {
    this.setData({
      addr: e.detail
    })
  },
  phoneChange(e) {
    this.setData({
      phone: e.detail
    })
  },
  onSure() {
    let {username,idcode,names,addr,types,phone} = this.data

    if(username === '') {
      wx.showToast({
        title: '法人姓名不能为空',
        icon: 'none'
      })
      return
    }else if(idcode === '') {
      wx.showToast({
        title: '身份证号码不能为空',
        icon: 'none'
      })
      return
    }else if(names === '') {
      wx.showToast({
        title: '酒店名称不能为空',
        icon: 'none'
      })
      return
    }else if(addr === '') {
      wx.showToast({
        title: '地址不能为空',
        icon: 'none'
      })
      return
    }else if(phone === '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none'
      })
      return
    }else if(!util.verifyPhone(phone - 0)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }else if(types === '') {
      wx.showToast({
        title: '酒店类型不能为空',
        icon: 'none'
      })
      return
    }else {
      http.request(api.ApiUserSave,{username,idcode,name:names,addr,genre,phone},'POST').then(res => {
        if(res.error_code === 0) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/person/person'
            })
          },1500)          
            
        }else if(res.error_code === 1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/person/person'
            })
          },1500)
        }
      })
    }
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