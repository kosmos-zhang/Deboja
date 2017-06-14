//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (rlog) {
          var code = rlog.code;
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)

              // 记录到服务器
              console.log('getUserInfo')
              wx.request({
                url: 'https://www.zhiya01.com/srv/AppService.asmx/LoginUser',
                data: {
                  code: code,
                  encryptedData:res.encryptedData,
                  iv:res.iv
                },
                method: 'POST',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                }
              })
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})