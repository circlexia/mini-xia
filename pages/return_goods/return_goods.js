// pages/return_goods/return_goods.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: app.d.bgcolor, //页面标题为路由参数
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    var otype = options.type ? options.type:false;
    console.log(options)
    this.setData({
      bgcolor: app.d.bgcolor,
      id: options.id,
      oid:options.oid,
      otype: otype
    });
  },
  remarkInput: function (e) {
    this.setData({
      remark: e.detail.value,
    });
  },
  submitReturnData: function(e){
    console.log(e)
    var remark = e.detail.value.remark;
    var that = this;
    var formId = e.detail.formId;

    if (remark.length < 1) {
      wx.showToast({
        title: '退款原因不能为空!',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    

    if (formId != 'the formId is a mock one') {
      app.request.wxRequest({
        url: app.d.ceshiUrl + '&action=product&m=save_formid',
        data: { from_id: formId, userid: app.globalData.userInfo.openid },
        method: 'post',
        success: function (res) {
          console.log(res)
        }
      })
    }

    wx.request({
      url: app.d.ceshiUrl + '&action=order&m=ReturnData',
      method: 'post',
      data: {
        id: that.data.id,
        oid: that.data.oid,
        otype: that.data.otype,
        back_remark: remark,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {       
        var status = res.data.status;
        if (status == 1) {
          wx.showToast({
            title: res.data.succ,
            success: 2000
          });
          wx.redirectTo({
            url: '/pages/return_goods/index?currentTab=0&otype=whole',
          });
        } else {
          wx.showToast({
            title: res.data.err,
            duration: 2000
          });
        }
      },
    });
  }
})