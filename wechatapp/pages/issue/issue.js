//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    questionId : 0,
    question: {},
    answers: [],
  },
  onLoad: function(ev) {
    var that = this
    console.log(ev)
    that.setData({
      questionId: ev.qid
    })

    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/GetQuestionDetail',
      data: {
        questionId: ev.qid
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.d);
        that.setData({
          question: list.Data[0]
        })
      }
    })

    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/GetQuestionAnswers',
      data: {
        questionId: ev.qid
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.d);
        that.setData({
          answers: list.Data
        })
      }
    })
  },
  toPerson: function(e) {
    console.log(e)
    wx.navigateTo({
        url: '../person/person?master=' + e.target.dataset.master
    })
  },
  toPerson: function(e) {
    console.log(e)
    wx.navigateTo({
        url: '../person/person?master='+e.currentTarget.dataset.master
    })
  },
  onBtnReplyClick: function() {
    var that = this;
    console.log('onBtnClick');
    wx.navigateTo({
      url: '../reply/reply?qid=' + that.data.questionId,
      success: function (res) {
        // success
        console.log('onBtnClick success() res:');
      },
      fail: function () {
        // fail
        console.log('onBtnClick fail() !!!');
      },
      complete: function () {
        console.log('onBtnClick complete() !!!');
        // complete
      }
    })
  }

})
