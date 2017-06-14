//mine.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    myProfile: [{ "desc": "我问", "id": "myQues" }, { "desc": "我答", "id": "myHeared" }],
    myAccount: ["帮助", "关于"]
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShow: function () {
    console.info("show")
  },
  loadProfile: function (e) {
    console.log(e.target)
  }
})
