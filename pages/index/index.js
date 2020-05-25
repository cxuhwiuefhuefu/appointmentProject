//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    periodTime: "10:00-14:00", // 游客游玩的时间段
    timeNum: 1,
    locationNum: 5,
    cardNum: 1,

    touristLocation: "大鹏所城文化旅游区", // 游客游玩地点
    date: '2016-09-01', // 游客游玩的日期
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
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
    console.log(e.detail.value);
  },


  // 监听其他证件输入框失去焦点事件
  bindNameBlur: function(e) {
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
    console.log('弹出框');

    this.setData({
      hiddenmodalput: false
    })
    
  },


  // 关闭弹窗 
  closeWindow: function() {
    this.setData({
      hiddenmodalput: false
    })
  }
})






//   正常16   小12