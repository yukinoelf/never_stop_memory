// pages/photo/photo.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path: '',
    name: '',
    remark: '',
    position: '',
    storeFlag: false,
    recordFlag: false,
    recordPath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.chooseImage({
      count: 1, // 默认9
      success: function (res) {
        wx.showToast({
          title: '上传中...',
          icon: 'loading',
          duration: 10000
        })
        let MyFile = new wx.BaaS.File()
        let fileParams = {
          filePath: res.tempFilePaths[0],
        }
        let metaData = { categoryName: 'sdk' }

        MyFile.upload(fileParams, metaData).then((res) => {
          that.data.storeFlag=true
          console.log(res.data.path)
          wx.hideToast()
          that.setData({
            path: res.data.path
          })
        }, (err) => {

        })
      }
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
    if (this.data.storeFlag == true) {
      util.addPhoto(this, (res) => {
        console.log(res.data)
      })
    }
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

  positionSelect: function (e) {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          position: res.name
        })
      },
    })
  },

  record: function (e) {
    let that = this
    console.log(that.data.recordFlag)

    const recorderManager = wx.getRecorderManager()
    const options = {
      duration: 12000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }

    if (that.data.recordFlag==false) {
      recorderManager.start(options)
      that.setData({
        recordFlag: true
      })
    } else {
      that.setData({
        recordFlag: false
      })
      recorderManager.stop()
    }

    recorderManager.onStop((res) => {
      console.log('recorder stop', res.tempFilePath)
      wx.showToast({
        title: '上传中...',
        icon: 'loading',
        duration: 10000
      })
      let MyFile = new wx.BaaS.File()
      let fileParams = {
        filePath: res.tempFilePath,
      }
      let metaData = { categoryName: 'sdk' }

      MyFile.upload(fileParams, metaData).then((res) => {
        that.data.storeFlag = true
        console.log(res.data.path)
        wx.hideToast()
        that.setData({
          recordPath: res.data.path
        })
      }, (err) => {

      })

      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = res.tempFilePath
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    })
  },
})