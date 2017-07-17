// pages/personCenter/personCenter.js
var app = getApp();
Page({
  data:{
    modalHidden3:true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  logout: function () {
    var that = this
    wx.request({
      url: 'https://base.fang-crm.com/Api/WeChat/logout?key=356o192c191db04c54513b0lc28d46ee63954iab',
      data: {
        user_id: app.globalData.user_id,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (ress) {

        app.globalData.user_id = null;
        wx.setStorageSync('user_id', null);

        wx.redirectTo({
          url: "/pages/index/index",
        })
      },
      fail: function () {
        that.setData({
          modalHidden3: false,
          errMsg: 'CRM接口调用失败'
        })
      }
    })
  },
  modalChange3: function (e) {
    this.setData({
      modalHidden3: true
    })
  },
})