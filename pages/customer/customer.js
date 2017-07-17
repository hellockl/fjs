// pages/customer/customer.js
var util = require('../../utils/util.js')
var app = getApp();
/*
var GetList = function (that,p='1' ,k='') {
  that.setData({
    hidden: false
  });
  wx.request({
    url: 'https://sale.fang-crm.com/Api/Customer/getlist?key=mvpa192b7913b06c54574d18c28d46e63954issb',
    data: {
      owner_id: app.globalData.user_id,
      p: p,
      k: k
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      if (res.data.errNum == '0') {
        var arr = [];
        for (var obj in res.data.retData) {//时间戳转换日期
          arr[obj] = res.data.retData[obj];
          var t = res.data.retData[obj]['receive_time'] * 1000;
          arr[obj]['receive_time'] = util.formatTime(new Date(t));

        }
        that.setData({
          customerlist: that.data.customerlist.concat(arr)
        });
        that.setData({
          hidden: true,
          hasRefesh:false
        });
      }
    },
    fail:function(res){
      that.setData({
        modalHidden3:false,
        hidden: true,
        errMsg: '无法调用通通  http://beta-sale.fang-crm.com/Api/Customer/getlist?key=mvpa192b7913b06c54574d18c28d46e63954issb'
      })
    }
  });
};
*/


Page({
  checkCustomer: function (e) {
    console.log('login send');
    console.log(e.detail.value.condition);
    var that = this;
    that.setData({
      customerlist: [],
    });
    //GetList(that,1,e.detail.value.condition);
  },

  data: {
    customerlist: [],
    item: null,
    modalHidden3:true,
    hasRefesh:true,
    p:1
  },
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    that.setData({
      customerlist: [],
    });
    //GetList(that);
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    //在页面展示之后先获取一次数据
    // var that = this;
    // that.setData({
    //   customerlist: [],
    // });
    // GetList(that);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  bindDownLoad: function () {
    //页面滑动到底部的事件
    var that = this;
    var p = ++that.data.p
    GetList(that,p);
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },
  refresh: function (event) {
    //该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    this.setData({
      customerlist: [],
      scrollTop: 0,
      hasRefesh:true,
      p:1
    });
    GetList(this)
  },

  detail: function (e) {
    var customer_id = e.currentTarget.id
    app.globalData.customer_id = customer_id
    wx.navigateTo({
      url: '/pages/customerdetail/customerdetail',
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
  modalChange3: function (e) {
    this.setData({
      //modalHidden3: true
    })
  },
})