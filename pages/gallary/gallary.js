// pages/gallary/gallary.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrlList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.getPhotos(this, (res) => {
      console.log(res.data.objects)
      this.setData({
        imageUrlList: res.data.objects
      })
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
  
  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    var imageList = this.data.imageUrlList;
    var urlList = []
    for (var i = 0; i < imageList.length; i++) {
      urlList.push(imageList[i].path)
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接 
      urls: urlList // 需要预览的图片http链接列表 
    })
  },

  editPhoto: function (e) {
    wx.navigateTo({
      url: '../photoEdit/photoEdit?dataObj=' + JSON.stringify(e.target.dataset.photo)
    })
  }
})