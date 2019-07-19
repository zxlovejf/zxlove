// pages/home/home.js
import {ajax} from "../../utils/index.js"
// 路经
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word:"Are you OK",
    count:7788,
    flag:false,
    id:1902,
    imgUrl:"http://47.103.16.105/base/imgs/1.jpg",
    url:"http://47.103.16.105/zxnews/index.html",
    array: [
        {
        message: 'foo',
        },
        { message: 'bar'}, 
        { message: 'zuozuomu',}
    ],
    num: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isLogin:true,
     users:{
       names:"leilei",
       age:28
     },
     like:{
       liker:"隔壁老王",
       count:8888
     },
    itemList:["拍照","从手机相册选择图片"],
    actionData:{
      hidden:true,
      items:["护照","移民","签证"]
    },
    loginData:{
      isLogin:false,
      code:"",
      mobile:"18871576759"    //后台格式是字符串
    }
  },
  countAdd(){
    this.setData({
      count:++this.data.count
    })
  },
  changeword(e){  //父组件定义方法
    console.log(e);
    this.setData({
      word:e.detail.value
    })
  },
  sendCode(){
    wx.showLoading({
      title:"请求中..."
    })
        //发送
    wx.request({
      url: 'http://47.103.16.105:1902/react/sendCode', //仅为示例，并非真实的接口地址
      method:"Post",
      data: {
        mobile:this.data.loginData.mobile   //后台格式是字符串
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        wx.hideLoading();
        wx.showToast({title:res.data.msg})
      }
    })
  },
  getCode(e){
    console.log(e.detail);
    this.setData({
      "loginData.code":e.detail.value
    })
  },
  getMobile(e){
    console.log(e);
    this.setData({
      "loginData.mobile":e.detail.value
    })
  },
  logincancel(){
    this.setData({
      "loginData.isLogin":true
    })
    console.log(this.data.loginData.isLogin);
  },
  autoLogin(){
    ajax({
      url:"http://47.103.16.105:1902/react/checkCode",
      method:"POST",
      data:{
        mobile:this.data.loginData.mobile,
        code:this.data.loginData.code
      },
      cb:(res)=>{
        // 成功回调
        console.log(res);
        if(!!res.data.type){  //接口属性type
          wx.setStorageSync("islogin",!!res.data.type)  //本应该存储，用户名token
        }else{
          wx.setStorageSync("isLogin",!!res.data.type)
        }

        this.setData({  //界面隐藏
          "loginData.isLogin":true
        })

        
      }
    })
  },
  todoSome(e){
    console.log(e);
    var idx=e.target.dataset.idx;
    wx.showToast({  //api  方法
      title: `${this.data.actionData.items[idx]} success`,
      // 此处长字符串，  ${}   多层对象
      icon: 'success',
      duration: 500
    })
    this.setData({  
      "actionData.hidden":true
    })
  },
  actioncancel(){
    this.setData({  
      "actionData.hidden":true
    })
  },
  openMyAction(){
    this.setData({
      "actionData.hidden":false //actionData.hidden对象的对象，加引号
    })
  },
  openaction(){
    wx.showActionSheet({
      itemList: this.data.itemList, //拍照 
      success(res) {
        console.log(res.tapIndex)
          if(res.tapIndex==0){
            wx.chooseImage({  //吊起拍照
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['album', 'camera'],
              success (res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
              }
            })
          }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  openModal(){
    // 展示提示弹框api  方法
    wx.showModal({
      title: '警告',
      content: '你正在使用4G流量观看视频!!!',
      cancelText:"暂停播放",
      cancelColor:"#000000",
      confirmText:"继续播放",
      confirmColor:"#d81e06",
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({  //api  方法
            title: '土豪,你继续',
            icon: 'success',
            duration: 500
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

 
  getParent(){
    console.log("getParent.../");
  },
  childOne(){
    console.log("childOne不会阻止事件冒泡");
  },
  childTwo(){
    console.log("childtwo一定会阻止事件冒泡");
  },
  getSomething(e){
    console.log(e);
    console.log(e.detail.value);  //input值获取
  },
  tapMe(e){
    console.log(e);
    console.log(e.target.dataset.id); //按钮携带信息
  },
  changeflag(){  //传递参数
    // console.log(e);
    this.setData({
      flag:!this.data.flag
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   "loginData.isLogin":!wx.getStorageSync("isLogin")  //
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})