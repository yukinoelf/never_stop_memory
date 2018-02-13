//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    flag: [],
    userFlag:"",
    user: app.globalData.userInfo
  },

  onLoad: function () {
    this.checkSettingStatus()
  },

  fetchFlagList() {
    util.getFlag(this, (res) => {
      console.log(res.data.objects)
      this.setData({
        flag: res.data.objects, // bookList array, mock data in mock/mock.js
        user: app.globalData.userInfo
      })
    })
  },

  photo(e) {
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        let MyFile = new wx.BaaS.File()
        let fileParams = { filePath: res.tempFilePaths[0] }
        let metaData = { categoryName: 'yuki' }

        MyFile.upload(fileParams, metaData).then((res) => {
          let data = res.data  // res.data 为 Object 类型
          console.log(data)
        }, (err) => {

        })
      }
    })
  },

  gallary(e) {
    console.log("gallary")
  },

  checkSettingStatus: function (cb) {
    var that = this;
    // 判断是否是第一次授权，非第一次授权且授权失败则进行提醒
    wx.getSetting({
      success: function success(res) {
        console.log(res.authSetting);
        var authSetting = res.authSetting;
        if (util.isEmptyObject(authSetting)) {
          console.log('首次授权');
          wx.BaaS.login().then(() => {
            that.freshUserInfo()
          })
        } else {
          console.log('不是第一次授权', authSetting);
          // 没有授权的提醒
          if (authSetting['scope.userInfo'] === false) {
            wx.showModal({
              title: '用户未授权',
              content: '如需正常使用功能，请按确定并在授权管理中选中“用户信息”，然后点按确定。最后再重新进入小程序即可正常使用。',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: function success(res) {
                      console.log('openSetting success', res.authSetting);
                      wx.BaaS.login().then(() => {
                        that.freshUserInfo()
                      })
                    }
                  });
                }
              }
            })
          } else {
            that.freshUserInfo()
          }
        }
      }
    });
  },

  freshUserInfo: function () {
    app.globalData.userInfo = wx.BaaS.storage.get('userinfo')
    this.setData({
      user: app.globalData.userInfo
    })
  },

  askPermissions: function (){
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
      },
    })
  }
})
