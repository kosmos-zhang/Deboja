//feeds.js
//获取应用实例
var app = getApp()
Page({
  data: {
    hidden: true,
    pindex: 1,
    motto: 'Hello World',
    userInfo: {},
    feedList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    console.log('onLoad')
    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/MostPopularQuestions',
      data: {
        position: that.data.pindex
      },
      method:  'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.d);
        that.setData({
          feedList: list.Data
        })
        try {
          wx.setStorageSync('feeds', list.Data)
        } catch (e) { }
      }
    })
  },
  onPullDownRefresh: function () {
    console.info("被拉下了")
  },
  toPerson: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../person/person?master=' + e.target.dataset.master
    })
  },
  upper: function () {

  },
  lower: function () {
    console.log("到底啦")
    if (this.requestFlag === false) {
      this.requestFlag = true
      this.setData({
        hidden: false,
        pindex: this.data.pindex + 1
      })
      var that = this
      setTimeout(that.getFeeds, 3000)
    }
  },
  requestFlag: false,
  getFeeds: function () {
    var that = this
    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/MostPopularQuestions',
      data: {
        position: that.data.pindex
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.requestFlag = false
        that.setData({
          hidden: true
        })
        var list = JSON.parse(res.data.d);
        if (list.Data.length > 0)
        {
          var feedsStorage = wx.getStorageSync('feeds') || []
          feedsStorage = feedsStorage.concat(list.Data)
          that.setData({
            feedList: feedsStorage
          })
          try {
            wx.setStorageSync('feeds', feedsStorage)
          } catch (e) { }
        }
        console.log("同步成功啦")
      }
    })
  }
})
