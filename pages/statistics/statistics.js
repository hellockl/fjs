// pages/statistics/statistics.js
var app = getApp();
Page({
  data:{
    history_data:null,
    current_data:null
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
        url: 'https://sale.fang-crm.com/Api/DataCenter/getSaleData?key=356a192b7913b06c54574d18c28d46e6395428ab',
        data: {
          user_id: app.globalData.user_id,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res.data.retData);
          that.setData({
            history_data: res.data.retData.history_data,
            current_data: res.data.retData.current_data,
          });
        },
        
      });
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
  }
})