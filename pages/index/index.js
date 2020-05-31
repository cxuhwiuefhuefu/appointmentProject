//index.js
//获取应用实例
const app = getApp()

// 引入js
var util = require('../../utils/util.js');

Page({
  data: {
    periodTime: "10:00-14:00", // 游客游玩的时间段
    timeNum: 1,
    locationNum: 5,
    cardNum: 1,

    touristLocation: "大鹏所城文化旅游区", // 游客游玩地点
    date: '2020-05-01', // 游客游玩的日期
    touristName: '', // 游客姓名
    touristCardNumber: '', // 游客证件号码
    touristPhoneNumber: '', // 游客手机号码 

    hiddenmodalput: true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      date: time
    }); 
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  // 跳转到报备记录页面
  toRecord: function() {
    wx.navigateTo({
      url: "../record/record"
    });
  },


  // 选择时间段
  checkTime: function(e) {
    console.log(e.target.dataset.text);
    this.setData({
      periodTime: e.target.dataset.text
    })

    this.setData({  
      "active": "active"
    })
  },


  // 给时间添加特殊的class类名
  addTimeClass: function(e) {
    this.setData({
      timeNum: e.target.dataset.index
    })
  },


  // 给地点添加特殊的class类名
  addLocationClass: function(e) {
    this.setData({
      locationNum: e.target.dataset.index
    })
    console.log(e.target.dataset.location);
    this.setData({
      touristLocation: e.target.dataset.location
    })
  },


  // 给身份证添加特殊的class类名
  addCardClass: function(e) {
    console.log(e.target.dataset.index);
    this.setData({
      cardNum: e.target.dataset.index
    })
  }, 

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  
  // 监听名字输入框失去焦点事件
  bindNameBlur: function(e) {
    this.setData({
      touristName: e.detail.value 
    })
    console.log(this.data.touristName);
  },


  // 监听其他证件输入框失去焦点事件
  bindCardBlur: function(e) {
    this.setData({
      touristCardNumber: e.detail.value 
    })
    console.log(e.detail.value);
  },


  // 监听联系电话输入框失去焦点事件
  bindPhoneBlur: function(e) {
    this.setData({
      touristPhoneNumber: e.detail.value 
    })
    console.log(e.detail.value);
  },


  // 确认预约
  comfirm: function() {
     
    // 电话号码正则
    var telStr = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    // 身份证正则
    var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    // 姓名正则
    var namereg = /^[\u4E00-\u9FA5]{2,4}$/;
    console.log(this.data.touristName);
    
    if(!(namereg.test(this.data.touristName))) { // 姓名不规范
      
      console.log(!namereg.test(this.data.touristName));
      console.log('姓名输入不规范');
      wx.showToast({
        title: '姓名忘记填写',
        icon: 'false',
        duration: 2000
      })
      return;
    }
    console.log(1)
    if(!(idcardReg.test(this.data.touristCardNumber))) { // 身份证不规范
      console.log('身份证输入不规范');
      wx.showToast({
        title: '身份证有误',
        icon: 'false',
        duration: 2000
      })
      return;
    }
    
    if (!(telStr.test(this.data.touristPhoneNumber))) { // 手机号码不规范
      console.log('手机号码输入不规范');
      wx.showToast({
        title: '手机号码有误',
        icon: 'false',
        duration: 2000
      })
      return;
    }

    // 弹出预约框
    this.setData({
      hiddenmodalput: false
    })
  },


  // 关闭弹窗事件 
  closeWindow: function() {
    this.setData({
      hiddenmodalput: true
    })

    console.log(1111);
  },


  // 点击确认报备事件
  comfirmReport: function() {
    wx.showModal({
      title: '很抱歉！预约人数已满',
      // content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})






//   正常16   小12