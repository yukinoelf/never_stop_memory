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
    clientId: '', // 从 BaaS 后台获取 ClientID
    tableFlagId: 22556,
    tableResultId: 23236,
    cityName: '',
    cityImage: ''
  }
})