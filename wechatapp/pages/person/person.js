//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    masterId:0,
    masterInfo:{}
  },
  onLoad: function(e) {
    var that = this
    console.log(e)
    that.setData({
      hotMasters: e.master
    })
    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/GetMasterDetail',
      data: {
        masterId: e.master
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.d);
        that.setData({
          masterInfo: list.Data[0]
        })
      }
    })
  },
  toIssue: function(e) {
      console.log(e)
      wx.navigateTo({
          url: '../issue/issue?master=' + e.target.dataset.master
      })
  },
  rpSubmit: function(e)
  {
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
        wx.switchTab({
          url: '../feeds/feeds',
          success:  function  (e)  {
            var page = getCurrentPages().pop();
            if (page == undefined || page == null) return;
            page.onShow();
          }
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})
