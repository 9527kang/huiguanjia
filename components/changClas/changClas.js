// components/changClas/changClas.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    arrData: Array,
    active: {
      type: Number,
      value: null
    },
    more: {
      type: Boolean,
      value: false
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
    changeClas(e) {
      let oid = e.currentTarget.dataset.oid,
      arrData = this.data.arrData,
      index = arrData.findIndex(item => item.oid === oid),
      active = this.data.active
    
      if (active === index) return
      this.setData({
        active: index
      })
      this.triggerEvent('click', oid)
    }
  }
})
