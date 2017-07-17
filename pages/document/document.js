// pages/document/document.js
const util = require("../../utils/util.js");
var app = getApp();
//var user_id = app.globalData.user_id;
//var base_api = 'http://sale.fang-crm.com/Api/Document/getCategoryAll?key=mvpa192b7913b06c54574d18c28d46e63954issb';
var upload_api = 'https://sale.fang-crm.com/Api/Document/uploadDoc?key=mvpa192b7913b06c54574d18c28d46e63954issb';
//var upload_api = 'http://crm.dev.com/sale/Api/Document/uploadDoc?key=mvpa192b7913b06c54574d18c28d46e63954issb';
var check_mobile_api = 'https://sale.fang-crm.com/Api/Document/checkMobileDocument?key=mvpa192b7913b06c54574d18c28d46e63954issb';
//var base_api = 'http://crm.dev.com/sale/Api/Document/getCategory?key=mvpa192b7913b06c54574d18c28d46e63954issb';
var base_api = 'https://sale.fang-crm.com/Api/Document/getCategory?key=mvpa192b7913b06c54574d18c28d46e63954issb';

Page({
  data: {
    modalHidden2: true,
    modalHidden3: true,
    listShow:false,
    hiddenToast:true,
    category_id: 0,
    customer_id: 0,
    errMsg :"error message",
    tempFilePaths: [],
    imageList:[],
    category_1: [],
    category_2: [],
    category_3: [],
    category_4: [],
    category_5: [],
    list: [
      {
        id: 'a',
        name: '1 个人信息',
        open: false,
        show: true,
        index:0,
        userDocument:[],
        category:[],
        tempFilePaths:[]  
      }, {
        id: 'b',
        name: '2 公司信息（针对自雇人士）',
        open: false,
        show: true,
        index:0,
        userDocument:[],
        category:[],
        tempFilePaths:[]
      }, {
        id: 'c',
        name: '3 个人收入信息',
        open: false,
        show: true,
        index:0,
        userDocument:[],
        category:[],
        tempFilePaths:[]
      }, {
        id: 'd',
        name: '4 房产信息',
        open: false,
        show: true,
        index:0,
        userDocument:[],
        category:[],
        tempFilePaths:[]
      }, {
        id: 'e',
        name: '5 其它',
        open: false,
        show: true,
        index:0,
        userDocument:[],
        category:[],
        tempFilePaths:[]
      }
    ]
  
  },
  toastHidden:function(){
    this.setData({
        hiddenToast: true
    })
  },
  imageError: function(e) {

    // var id = e.currentTarget.id, list = this.data.list;
    // for (var i = 0, len = list.length; i < len; ++i) {
    //   if (list[i].id == id) {
    //     var list2 = list[i].userDocument;
    //     for(var j=0,leng = list2.length;j<leng;++j){
    //       list2[j].document_path = 'http://beta-sale.fang-crm.com/Uploads/2017-01-12/5876f08f6235f.png' 
    //     }
    //   } 
    // }
    // this.setData({
    //   list: list
    // });
    this.setData({
      image:'http://beta-sale.fang-crm.com/Uploads/2017-01-12/5876f08f6235f.png'
    })
    console.log(e);
    console.log('image发生error事件，携带值为', e.detail.errMsg)
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var _this = this;
    var list = this.data.list;
    if(app.globalData.phone){
      _this.setData({
        phone:app.globalData.phone
      })
    }
    
     
    wx.request({
      url: base_api,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        
        for (var i = 1; i <= 5; i++) {
          for (var obj in res.data.data[i]) {
            for (var v in res.data.data[i][obj]) {              
              var a = res.data.data[i][obj][v];
              var b = {id:v,name:a}
              switch(i){
                case 1:
                  _this.setData({
                    category_1: _this.data.category_1.concat(b),
                  })
                  break;
                case 2:
                  _this.setData({
                    category_2: _this.data.category_2.concat(b),
                  })
                  break;
                case 3:
                  _this.setData({
                    category_3: _this.data.category_3.concat(b),
                  })
                  break;
                case 4:
                  _this.setData({
                    category_4: _this.data.category_4.concat(b),
                  })
                  break;
                case 5:
                  _this.setData({
                    category_5: _this.data.category_5.concat(b),
                  })
                  break;
              }
            }
          }
        }
        
        list[0].category = _this.data.category_1
        list[1].category = _this.data.category_2
        list[2].category = _this.data.category_3
        list[3].category = _this.data.category_4
        list[4].category = _this.data.category_5
        
        _this.setData({
            list:list
        })
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    //util.getRequest("CRM_SALE_API");
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {

    // 页面显示
    if(app.globalData.phone){
      this.setData({
        phone:app.globalData.phone
      })
    }
    this.setData({
      listShow:false
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  widgetsToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open;
      } else {
        list[i].open = false;
      }
    }
    this.setData({
      list: list,
      category_id:0
    });
  },
  modalChange2: function(e) {
    this.setData({
      modalHidden2: true
    })
  },
  modalChange3: function(e) {
    this.setData({
      modalHidden3: true
    })
  },
  chooseimage: function (e) {   
    var _this = this,list = this.data.list,id = e.currentTarget.id;
    if(_this.data.category_id==0){
      _this.setData({
        modalHidden2: false
      })
      return false;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片 
        for (var i = 0, len = list.length; i < len; ++i) {
          if (list[i].id == id) {
            list[i].tempFilePaths = _this.data.list[i].tempFilePaths.concat(res.tempFilePaths);
          }
        }
        _this.setData({
            list:list, 
        })
        
        wx.uploadFile({
          url: upload_api, //图片上传接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'customer_id': _this.data.customer_id,
            'category_id': _this.data.category_id,
            'creator_id': app.globalData.user_id,//14
            'document_source': 'MOBILE',
            'imagefile': res.tempFilePaths[0]
          },
          success: function (res) {
            //var data = res.data
            _this.setData({
              hiddenToast: !_this.data.hiddenToast,
              errMsg:'上传成功！',
              category_id:0
            })    
          },
          fail: function (res) {
            _this.setData({
              hiddenToast: !_this.data.hiddenToast,
              errMsg:'上传失败！',
              category_id:0
            })
          },
        })
        
      }
    })
  },
  previewImage: function (e) {
    //预览图片
    var current = e.target.dataset.src,list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      
      for(var object in list[i].userDocument){
        this.setData({
          imageList:this.data.imageList.concat(list[i].userDocument[object].document_path)
        })
      }
    }
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  checkMobileDocument: function (e) {
    //根据手机号查找用户
    var _this = this,list = this.data.list,phone=e.detail.value.phone;
    if(!phone){
      _this.setData({
        modalHidden3: false,
        errMsg:'手机号不能为空！'
      })
      return false;
    } 

    for (var i = 0, len = list.length; i < len; ++i) {          
      list[i].tempFilePaths = [];          
    }

    wx.request({
      url: check_mobile_api,
      data: {
        phone_number: phone,//15145454545,
        owner_user_id: app.globalData.user_id, //14
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        if(res.data.status==1){
          if(res.data.data.document){
            list[0].userDocument = res.data.data.document[1];
            list[1].userDocument = res.data.data.document[2];
            list[2].userDocument = res.data.data.document[3];
            list[3].userDocument = res.data.data.document[4];
            list[4].userDocument = res.data.data.document[5];
          }
          _this.setData({
            list:list,
            customer_id:res.data.data.customer_id,
            listShow:true,
            
          })

        }else{

          _this.setData({
              modalHidden3:false,
              errMsg:res.data.message,
              
          })

        }
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  bindPickerChange: function (e) {
    
    var id = e.currentTarget.id, list = this.data.list,val = e.detail.value;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].index = val;
        var category_id =  list[i].category[val].id
      }
    }
    this.setData({
      list: list,
      category_id: category_id
    });
    
  },
  
})