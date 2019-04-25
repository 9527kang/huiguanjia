const app = getApp()
var http = require('../../http/request');
var api = require('../../config/api');
var util = require('../../utils/util');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showChoice: false,
    radio: 0,
    degreeTitle: '请选择身份',
    degreeText: [{
      id: 1,
      name: '会员'
    },{
      id: 2,
      name: '销售经理'
    }],
    phoneNum: '',
    disabled: false,
    codeText: '获取验证码',
    code: null,
    pwd1: null,
    pwd2: null
  },
  showRadio(e) {
    this.setData({
      showChoice: true
    })
  },
  onClose() {
    this.setData({
      showChoice: false
    })
  },
  chooseDegree(e) {
    let { name,title } = e.currentTarget.dataset    

    this.setData({
      radio: name,
      degreeTitle: title,
      showChoice: false
    })

  },
  setPhone(e) {
    this.setData({
      phoneNum: e.detail
    })
  },
  getCode() {
    let phone = this.data.phoneNum
    if(phone === '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    } else if(!util.verifyPhone(phone - 0)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none'
      })
      return
    } else {
      let _that = this
      http.request(api.ApiLoginCode,{phone},'POST').then(res => {
        if(res.error_code === 0) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          let coden = 60
          let codeV = setInterval(function(){
            _that.setData({
              codeText: (--coden) + 's',
              disabled: true
            })
            if(coden == -1) {
              clearInterval(codeV)
              _that.setData({
                codeText: '重新获取',
                disabled: false
              })
            }
          },1000)
          
        }else if(res.error_code === 1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }else if(res.error_code === 2) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }
      })
    }
  },
  pushCode(e) {
    this.setData({
      code: e.detail
    })
  },
  setPwd(e) {
    this.setData({
      pwd1: e.detail
    })
  },
  confirmPwd(e) {
    this.setData({
      pwd2: e.detail
    })
  },
  comfirmBtn() {
    let {code,pwd1,pwd2,degreeTitle} = this.data
    let phone = this.data.phoneNum
    if(degreeTitle === '请选择身份') {
      wx.showToast({
        title: '请选择身份',
        icon: 'none'
      })
      return
    }else if(phone === '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none'
      })
      return
    } else if(!util.verifyPhone(phone - 0)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none'
      })
      return
    }else if(code === null) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      })
      return
    }else if(pwd1 === null) {
      wx.showToast({
        title: '请输入新密码',
        icon: 'none'
      })
      return
    }else if(pwd2 === null) {
      wx.showToast({
        title: '请确认新密码',
        icon: 'none'
      })
      return
    }else if(pwd1 !== pwd2) {
      wx.showToast({
        title: '两次输入密码不一致',
        icon: 'none'
      })
      return
    }else{
      // let uid = getStorageSync('uid')

      if(degreeTitle === '会员') degreeTitle = 1
      if(degreeTitle === '销售经理') degreeTitle = 2

      http.request(api.ApiIndexSave,{uid,code,phone,pwd:pwd1,level:degreeTitle},'POST').then(res => {
        if(res.error_code === 0) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          setTimeout(function(){
            wx.reLaunch({
              url: '/pages/login_choice/login_choice'
            })    
          },1500)
        }else if(res.error_code === 1) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }
        else if(res.error_code === 2) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }
        else if(res.error_code === 3) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }else if(res.error_code === 4) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }
        else if(res.error_code === 5) {
          wx.showToast({
            title: res.msg,
            icon: 'none'
          })
          return
        }
      })
    }
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