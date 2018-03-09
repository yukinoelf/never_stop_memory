// pages/photo_edit/photoEdit.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    path: '',
    name: '',
    remark: '',
    position: '',
    deleteFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataObj = JSON.parse(options.dataObj)
    console.log(options.dataObj)
    this.setData({
      id: dataObj.id,
      path: dataObj.path,
      name: dataObj.name,
      remark: dataObj.remark,
      position: dataObj.position
    })
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
    console.log(this.data.deleteFlag)
    if (this.data.deleteFlag == true) {
      return
    }

    util.updatePhoto(this, (res) => {
      this.setData({id: ''})
    })
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  remarkInput: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },

  delete: function (e) {
    let that = this
    wx.showModal({
      title: '删除记忆',
      content: '您确定要删除这段记忆吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          util.deletePhoto(that, (res) => {
            that.setData({ id: '', deleteFlag: true })
            wx.navigateBack()
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })

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