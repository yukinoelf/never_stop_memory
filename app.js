//app.js
App({
  onLaunch: function () {
    // require SDK
    require('./sdk-v1.1.4')
    // 初始化 SDK
    let clientID = '53aa75bccb91b0d3a55e'
    wx.BaaS.init(clientID)
  },
  globalData: {
    userInfo: null,
    tablePhotoId: 25388,
    cityName: '',
    cityImage: ''
  }
})