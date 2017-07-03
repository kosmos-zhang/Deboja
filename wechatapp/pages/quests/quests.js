//quests.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    feedList: []
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this
    console.log('onLoad')
    console.log(options);
    var tp = options.tp;

    app.getUserInfo(function (userInfo) {
      //更新数据
      var openId = wx.getStorageSync('openId') || "";

      var act = (tp == "myQues") ? "UserQuestions" : "AnsweredQuestions";
      wx.request({
        url: 'https://www.zhiya01.com/srv/AppService.asmx/' + act,
        data: {
          openId: openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          var list = JSON.parse(res.data.d);
          that.setData({
            feedList: list.Data
          })
          try {
            wx.setStorageSync('feeds', list)
          } catch (e) { }
        }
      })
    })
  },
  toPerson: function (e) {
    console.log(e)
    wx.navigateTo({
      url: '../person/person?master=' + e.target.dataset.master
    })
  },
})
