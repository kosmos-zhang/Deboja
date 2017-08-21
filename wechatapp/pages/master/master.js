//var app = getApp();
Page({
  data: {
    UserId: 0,
    OpenId : "",
    RealName : "",
    Mobile : "",
    IdCard : "",
    Birthday : "",
    Major : "",
    Description : "",
    CanEdit: true,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    var that = this

    //调用应用实例的方法获取全局数据
    var openId = wx.getStorageSync('openId') || "";

    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/GetMasterInfo',
      data: {
        openId: openId
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.d);
        if (list.Data != null && list.Data.length==1)
        {
          var master = list.Data[0];
          that.setData({
            UserId : master.UserId,
            OpenId : openId,
            RealName: master.RealName,
            Mobile: master.Mobile,
            IdCard: master.IdCard,
            Birthday: master.Birthday,
            Major: master.Major,
            Description: master.Description,
            CanEdit: (master.IsApproved != "1"),
          })
        }
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  datePickerBindchange: function (e) {
    this.setData({
      Birthday: e.detail.value
    })
  },
  formSubmit: function (e) {
    var that = this;
    console.log(e);

    var masterInfo = {
      OpenId: "",
      ApplyId: that.data.UserId,
      RealName: e.detail.value.username,
      Mobile: e.detail.value.usermobile,
      IdCard: e.detail.value.useridcard,
      Birthday: e.detail.value.userbirthday,
      Major: e.detail.value.usermajor,
      Description: e.detail.value.userdesc,
    }

    if (masterInfo.RealName.length <= 0 ||
      masterInfo.Mobile.length <= 0 ||
      masterInfo.IdCard.length <= 0 ||
      masterInfo.Major.length <= 0 ||
      masterInfo.Description.length <= 0) {
      wx.showModal({
         title: '提示',
         content: '请填写完整信息，已提高认证通过',
         success: function (res) {
         }
      })
      return;
    }

    var openId = wx.getStorageSync('openId') || "";
    console.log(openId);
    masterInfo.OpenId = openId;

    var postInfo = JSON.stringify(masterInfo);
    //提交(自定义的get方法)
    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/RequestToBeMaster',
      data: {
        masterInfo: postInfo,
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res);
        wx.switchTab({
          url: "../mine/mine",
        })
      },
      fail: function (res) {
        console.log(res);
      }
    })
  }
})
