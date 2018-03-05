//index.js
//获取应用实例
const util = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    user: app.globalData.userInfo,
    name:'',
    path:'',
    remark:''
  },

  onLoad: function () {
    this.checkSettingStatus()
  },

  photo(e) {
    wx.navigateTo({
      url: '../photo/photo'
    })
  },

  gallary(e) {
    wx.navigateTo({
      url: '../gallary/gallary'
    })
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
  },
})
