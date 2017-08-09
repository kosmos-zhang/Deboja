// reply.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionId: 0,
    btndisabled: false,
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    that.setData({
      questionId: options.qid
    });
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
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
  contentInput: function(e) {
    this.setData({
      rpContent: e.detail.value
    })
  },
  rpSubmit: function (e) {
    var that = this;
    console.log(e);
    var rpContent = e.detail.value.rpContent;
    if (rpContent.length <= 0)
    {
      return;
    }

    var openId = wx.getStorageSync('openId') || "";
    console.log(openId);
    //提交(自定义的get方法)
    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/AnswerQuestion',
      data: {
        openId: openId,
        questionId: that.data.questionId,
        content: rpContent,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        var t = new Date().getTime();
        wx.redirectTo({
          url: '../issue/issue?qid=' + that.data.questionId+'&t='+t
        })
      },
      fail: function(res){
        console.log(res);
      }
    })
  }
})