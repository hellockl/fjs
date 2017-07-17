// pages/customerdetail/customerdetail.js
var util = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    detail: null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var customer_id = app.globalData.customer_id;
    var _this = this
    wx.request({
      url: 'https://sale.fang-crm.com/Api/Customer/getCustomerInfo?key=mvpa192b7913b06c54574d18c28d46e63954issb',
      data: {
        customer_id: customer_id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res)
        //设置全局的变量
        app.globalData.house_status = res.data.retData.house_status;
        app.globalData.loan_amount  = res.data.retData.loan_amount;
        console.log('全集变量')
        console.log(app.globalData)
        // success
        res.data.retData['first_fenpei_time'] = util.formatTime(new Date(res.data.retData['first_fenpei_time'] * 1000));

        var log = res.data.retData['log'];
        for (var obj in log) {
          var create_time = util.formatTime(new Date(log[obj].create_time * 1000));
          log[obj].create_time = create_time
        }
        res.data.retData['log'] = log;
        _this.setData({
          detail: res.data.retData,
          customer_id: customer_id
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var customer_id = app.globalData.customer_id;
    var _this = this
    wx.request({
      url: 'https://sale.fang-crm.com/Api/Customer/getCustomerInfo?key=mvpa192b7913b06c54574d18c28d46e63954issb',
      data: {
        customer_id: customer_id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        //设置全局的变量
        app.globalData.house_status = res.data.retData.house_status;
        app.globalData.loan_amount  = res.data.retData.loan_amount;
        console.log('全集变量')
        console.log(app.globalData)
        res.data.retData['first_fenpei_time'] = util.formatTime(new Date(res.data.retData['first_fenpei_time'] * 1000));

        var log = res.data.retData['log'];
        for (var obj in log) {
          var create_time = util.formatTime(new Date(log[obj].create_time * 1000));
          log[obj].create_time = create_time
        }
        res.data.retData['log'] = log;
        _this.setData({
          detail: res.data.retData,
          customer_id: customer_id
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  addcommunication: function (e) {
    var customer_id = e.currentTarget.id
    app.globalData.customer_id = customer_id
    wx.navigateTo({
      url: '/pages/communication/communication',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  makePhoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.detail.telephonenumber //仅为示例，并非真实的电话号码
    })
  },
  document:function(){
    app.globalData.phone = this.data.detail.telephonenumber
    console.log(app.globalData)
    wx.switchTab({
      url: '/pages/document/document'
    })
  }
})