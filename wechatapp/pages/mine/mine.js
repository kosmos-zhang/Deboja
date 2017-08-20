//mine.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    openId: "",
    userInfo: {},
    isMaster: false,
    myProfile: [{ "desc": "我问", "id": "myQues", }, { "desc": "我答", "id": "myHeared" }],
    myMaster: [{ "desc": "申请专家认证", "id": "beMaster" }],
    myAccount: ["帮助", "关于"]
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      var openId = wx.getStorageSync('openId') || "";
      that.setData({
        userInfo: userInfo,
        openId: openId,
      })

      wx.request({
        url: 'https://www.zhiya01.com/srv/AppService.asmx/GetUserTypeInfo',
        data: {
          openId: openId
        },
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          var list = JSON.parse(res.data.d);
          that.setData({
            isMaster : (list.Data[0].IsMaster == "1")
          })
        }
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
