// pages/communication/communication.js
var app = getApp();
Page({
  data: {
    customer_id:null,
    need_confirm:true,
    house_status:'',
    loan_amount:0
  },
  formSubmit: function (e) {
    var customer_id = app.globalData.customer_id
    var user_id = app.globalData.user_id
    var house_status = e.detail.value.house_status
    var loan_amount = e.detail.value.loan_amount
    wx.request({
      url: 'https://sale.fang-crm.com/Api/Customer/addCommunicationLog?key=mvpa192b7913b06c54574d18c28d46e63954issb',
      method: 'POST',
      data: {
        customer_id: customer_id,
        create_user_id: user_id,
        content: e.detail.value.content,
        house_status:house_status,
        loan_amount:loan_amount
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data.errNum == 0) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          console.log('添加失败');
        }
      }
    })
  },
  onLoad: function (options) {
    var house_status = app.globalData.house_status
    var loan_amount = app.globalData.loan_amount
    if(loan_amount>0){
      var need_confirm = false
    }
    this.setData({
      customer_id: app.globalData.customer_id,
      need_confirm:need_confirm,
      house_status:app.globalData.house_status,
      loan_amount:app.globalData.loan_amount
    })

    
    console.log(this.data)
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var house_status = app.globalData.house_status
    var loan_amount = app.globalData.loan_amount
    if(loan_amount>0){
      var need_confirm = false
    }
    this.setData({
      customer_id: app.globalData.customer_id,
      need_confirm:need_confirm,
      house_status:app.globalData.house_status,
      loan_amount:app.globalData.loan_amount
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})