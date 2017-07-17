
const config = require('config.js')

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//get请求
function getRequest(url,parameters = "",success, method = "GET", header = {}) {
  //console.log(config);
  //console.log(url);
  //console.log(config.url);
  wx.request({
    url: config.CRM_SALE_API,
    data: {},
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header ? header : "application/json", // 设置请求的 header
    success: function(res){
      console.log(res);
      //success(res);
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}

//post请求
function postRequest(url,parameters = "",success, method = "POST", header = {}) {
  wx.request({
    url: config.url,
    data: {parameters},
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header ? header : "application/json", // 设置请求的 header
    success: function(res){
      //console.log(res);
      success(res);
    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })
}


module.exports = {
  formatTime: formatTime,
  getRequest:getRequest,
  postRequest:postRequest
}
