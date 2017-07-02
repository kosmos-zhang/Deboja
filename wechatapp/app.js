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
    var userInfo = wx.getStorageSync('userInfo') || null
    if (userInfo) {
      typeof cb == "function" && cb(userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function (rlog) {
          var code = rlog.code;
          //调用request请求api转换登录凭证  
          wx.getUserInfo({
            success: function (res) {
              wx.setStorageSync('userInfo', res.userInfo)

              typeof cb == "function" && cb(res.userInfo)

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
                  var list = JSON.parse(res.data.d);
                  wx.setStorageSync('openId', list.Data)
                }
              })
            }
          })
        }
      })
    }
  },
  globalData:{
  }
})