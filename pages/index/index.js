var app = getApp();
Page({
  formSubmit: function (e) {
    console.log('login send')
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            data: {
              appid: 'wx175bca05430576e2',
              secret: 'f90edf861f5892dc803fb7a88c3f541c',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success: function (result) {
              that.setData({
                openid: result.data.openid
              })
              console.log(result);
              var openid = result.data.openid
              //////
                wx.request({
                  url: 'https://base.fang-crm.com/Api/WeChat/checkLogin?key=356o192c191db04c54513b0lc28d46ee63954iab',
                  data: {
                    username: e.detail.value.name,
                    password: e.detail.value.password,
                    openid: openid,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (ress) {
                    console.log(ress)
                    wx.switchTab({
                      url: '/pages/customer/customer'
                    })
                    if (ress.data.errNum == '0') {
                      var user_id = ress.data.retData;
                      app.globalData.user_id = user_id;
                      wx.setStorageSync('user_id',user_id)
                      wx.switchTab({
                        url: '/pages/customer/customer'
                      })
                    }else{
                      that.setData({
                        modalHidden3:false,
                        errMsg: ress.data.errMsg
                      })
                    }
                  },
                  fail: function(){
                    that.setData({
                      modalHidden3:false,
                      errMsg: 'CRM接口调用失败'
                    })
                  }
                })
              /////
            },
            fail: function(){
              that.setData({
                modalHidden3:false,
                errMsg: '微信接口调用失败'
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    
  },
  data: {
    modalHidden3: true,
    errMsg: '',
    openid: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code',
            data: {
              appid: 'wx175bca05430576e2',
              secret: 'f90edf861f5892dc803fb7a88c3f541c',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success: function (result) {
              var openid = result.data.openid
              wx.setStorageSync('openid', result.data.openid)
              //////
              if (wx.getStorageSync('user_id')) {
                app.globalData.user_id = wx.getStorageSync('user_id')
                wx.switchTab({
                  url: '/pages/customer/customer'
                })
              } else {
                wx.request({
                  url: 'https://base.fang-crm.com/Api/WeChat/checkLogin?key=356o192c191db04c54513b0lc28d46ee63954iab',
                  data: {
                    openid: openid,
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    if (res.data.errNum == '0') {
                      var user_id = res.data.retData;
                      app.globalData.user_id = user_id
                      wx.setStorageSync('user_id', user_id)
                      wx.switchTab({
                        url: '/pages/customer/customer'
                      })
                    }else{
                       console.log(openid+'=>未登录过crm')
                    }
                  },
                  fail: function(){
                    that.setData({
                      modalHidden3:false,
                      errMsg: 'CRM接口调用失败'
                    })
                  }
                })
              }
              /////
            }
          })
        } else {
          that.setData({
            modalHidden3:false,
            errMsg: '获取用户登录态失败'+ res.errMsg
          })
        }
      }
    });
  },
  modalChange3: function (e) {
    this.setData({
      modalHidden3: true
    })
  },
  onShow: function () {
    if (false) {
      wx.switchTab({
        url: '/pages/customer/customer'
      })
    }
  },
  onShareAppMessage: function () {
    return {
      title: '房金所CRM',
      desc: '业务员小程序系统',
      path: '/pages/index/index'
    }
  }
})
