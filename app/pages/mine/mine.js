// pages/mine/mine.js
import {ajax} from "../../utils/index.js";
var order = ['red', 'yellow', 'blue', 'green', 'red']
let timer = null;
// 获取随机颜色
function getRandomColor () {  

  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    current:0,
    
    banner:[],
    poster:"https://zuozhaoxi.com/base/img/2.jpg",
    name:"人间不值得",
    author:"李诞",
    src:"https://zuozhaoxi.com/mp/Sugar.mp3",

    mv:[
      { 
          type : "又想骗我生女儿", 
          user : "@刘易欣", 
          title : "妈妈不生我你能当爸爸?", 
          url : "http://47.103.16.105/base/imgs/7827d2b45d62464f0c32974c4dadc4fa.mp4", 
          love : 250.0, 
          comments : 5.8
      }
    ],
    vSrc:"http://47.103.16.105/base/mp/meizi.mp4",//不是合法域名
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }],

    word:"1902",
    toggle:true,  //播放暂停关门狗

    // 下面的列表
    toView: '@刘易欣',
    scrollTop: 100  //下滑10px
  },

  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < this.data.mv.length; ++i) {
      if (this.data.mv[i].user === this.data.toView) {
        this.setData({
          toView: this.data.mv[i + 1].user
        })
        break
      }
    }
  },

  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  videoplay(){
    console.log("play")
    if(!wx.getStorageSync("play")){ //
        this.showWarning()  //
    }
  },
  videoupdate(){
    console.log("正在 playing... ")
    if(!wx.getStorageSync("play")&&this.data.toggle){
      // 观看视频时切换网络的bug  :视频播放记录太快，调弹框很多个 用  this.data.toggle
        this.showWarning()
        this.setData({
          toggle:!this.data.toggle  //掉了一个弹框，立马关们，关闭条件
        })
    }
  },
  showWarning(){
    // 暂停
    this.videoCtx.pause();
    // 不是wifi 
    wx.showModal({
      title: '警告',
      content: '你正在使用4G流量观看视频!!!',
      cancelText:"暂停播放",
      cancelColor:"#000000",
      confirmText:"继续播放",
      confirmColor:"#d81e06",
      success:(res)=> {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '土豪,你继续',
            icon: 'success',
            duration: 500
          });
          wx.setStorageSync("play",true); //开头流量播放，开门
          setTimeout(()=>{
            this.videoCtx.play();
            this.setData({
              toggle:true   //视频途中： 开门
            })
          },10)
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  bindSendDanmu(){
    // videoCtx是在onready声明的视频实例对象
    this.videoCtx.sendDanmu({
      text:this.data.word,
      color:getRandomColor()  //获取随机颜色
    })

    this.setData({
      word:""
    })
  },
  getWord(e){
    this.setData({
      word:e.detail.value
    })
  },
  
  bindButtonTap(){
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      // 从手机相册或者拍摄视频 ，加载播放
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          vSrc: res.tempFilePath
          // tempFilePath临时文件路径
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    timer = setInterval(()=>{
      if(this.data.current<100){
        this.setData({
          current:++this.data.current,
        })
      }else{
        clearInterval(timer);
        this.setData({
          show:!this.data.show,
          current:0
        })
        wx.showToast({
          title:"加载成功!"
        })
        this.getBanner();
      }
    },10)

    ajax({
      url:"http://47.103.16.105:1902/react//allVideos",
      cb:(res)=>{
        console.log(res);
        this.setData({
          mv:res.data.result
        })
      }
    })
    console.log(this.data.mv)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio');

    this.videoCtx = wx.createVideoContext('myVideo');

    wx.getNetworkType({
      success (res) {
        const networkType = res.networkType;  //获取网络状态 wifi 4G
        console.log(networkType);
        if(networkType=="wifi"){
          wx.setStorageSync("play",true)
        }else{
          wx.setStorageSync("play",false)
        }  
      }
    })


    wx.onNetworkStatusChange(function (res) {
      console.log(res.networkType);
      if(res.networkType=="wifi"){
        wx.setStorageSync("play",true)
      }else{
        wx.setStorageSync("play",false)
      }
      
      
    })

  },
  audioPlay(){
    // 播放
    this.audioCtx.play();
  },

  audioPause(){
    this.audioCtx.pause();
  },

  getBanner(){
    wx.request({
      url:"https://zuozhaoxi.com:1902/vue/movie",
      data:{
        limit:6
      },
      success:(res)=>{  //箭头函数
        console.log(res);
        this.setData({banner:res.data.result})
      }
    })
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