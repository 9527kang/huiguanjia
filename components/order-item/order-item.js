// components/order-item/order-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true
    },
    notice: {
      type: Boolean,
      value: false
    },
    isAssess: {
      type: Boolean,
      value: false
    },
    isBtn: {
      type: Boolean,
      value: true
    },
    status: {
      type: String,
      value: '已受理正在寻找合适场地'
    },
    title: {
      type: String,
      value: '大浪淘沙时尚酒店'
    },
    urls: {
      type: String,
      value: '/pages/issue/issue'
    },
    room: {
      type: String
    },
    dates: {
      type: String
    },
    image: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
