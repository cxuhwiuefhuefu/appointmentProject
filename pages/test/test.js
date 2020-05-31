// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: "24.e437c1bafaa4e28ec2a87915fbe57795.2592000.1593507793.282335-20158206"
  },

  // 上传身份证识别
  OcrIdCard: function(access_token){
    return new Promise(function(resolve,reject){
      var that = this;
      
      // 从本地相册选择图片或使用相机拍照
      wx.chooseImage({
        count: 1, // 图片张数
        sizeType: ['compressed'], // 所选图片尺寸： 压缩图
        sourceType: ['album', 'camera'], // 选择图片来源： 相册选图和使用相机
        success: function (res) {
          console.log(res); 
          console.log(res.tempFilePaths) // 图片的本地临时文件路径列表
          
          
          //核心代码    // 读取本地文件内容
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[0], // 本地路径
            encoding: 'base64', // 文件的编码格式
            success(ans) {
              console.log(ans);
              console.log(ans.data)

              // 显示loading提示框
              wx.showLoading({ title: '识别中' })
              
              // 
              wx.request({
                url: 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' + access_token,
                method: 'POST',
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                  image: ans.data,
                  id_card_side: 'front'
                },
                success(_res) {
                  console.log(2222);
                  wx.hideLoading();
                  resolve(_res)
                  
                }, 
                fail(_res) {
                  wx.hideLoading();
                  wx.showToast({
                    title: '请求出错',
                  })
                  reject(_res)
                }
              })
            }
          })
        }
      })
    })
  },


  // 获取身份证号码
  ocridcard: function(){
    var that = this;
    that.OcrIdCard(that.data.access_token).then(function(_res){
      console.log(11111);
      
      
      var trdata = _res.data.words_result;
      console.log(_res.data.words_result);
      // that.setData({
      //   name: trdata['姓名'].words,
      //   idcard: trdata['公民身份号码'].words,
      //   userloc: trdata['住址'].words
      // })
  })      
}

})