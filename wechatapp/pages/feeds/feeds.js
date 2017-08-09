//feeds.js
//获取应用实例
var app = getApp()
Page({
  data: {
    hidden: true,
    askquest: false,
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
    that.setData({
      feedList: [],
      pindex: 1,
    })
    console.log('onLoad')
    app.getUserInfo(function (userInfo) {});
    
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
  },
  onBtnAsk: function() {
    var that = this
    that.setData({
      askquest: true,
    })
  },
  rpSubmit: function (e) {
    var that = this;
    console.log(e);
    var rpContent = e.detail.value.rpContent;
    if (rpContent.length <= 0) {
      return;
    }

    var openId = wx.getStorageSync('openId') || "";
    //提交(自定义的get方法)
    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/AskQuestion',
      data: {
        openId: openId,
        title: rpContent,
        content: rpContent,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var t = new Date().getTime();
        wx.switchTab({
          url: '../feeds/feeds?t=' + t,
          success: function (e) {
            console.log(e);
            var page = getCurrentPages().pop();
            if (page == undefined || page  == null)  return;
            page.onLoad();
          }
        })
        that.setData({
          askquest: false,
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})
