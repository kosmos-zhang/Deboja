Page({
  data: {
    pindex: 1,
    hotMasters: []
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: 'https://www.zhiya01.com/srv/AppService.asmx/GetAllMasters',
      data: {
        position: that.data.pindex
      },
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        var list = JSON.parse(res.data.d);
        that.setData({
          hotMasters: list.Data
        })
      }
    })
  },
  toPerson: function (e) {
    wx.navigateTo({
      url: '../person/person?master=' + e.target.dataset.master
    })
  }
})
