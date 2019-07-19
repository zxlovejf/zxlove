// pages/classify/classify.js
import {ajax} from "../../utils/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabs:[],
      goods:[],
      show:false,
      current:0
  },

  
  swiperchange(e){
    console.log(e);
    this.setData({
      current:e.detail.current
    })
  },

  changeActive(e){
    var idx = e.target.dataset.idx;
    this.setData({
      current:idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax({
      url:"https://zuozhaoxi.com:1902/vue/getGoodTypes",
      cb:(res)=>{
        console.log(res);
        this.setData({
          tabs:res.data.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    ajax({
      url:"https://zuozhaoxi.com:1902/vue/getGoods",
      cb:(res)=>{
        console.log(res);
        this.setData({
          goods:res.data.result,
          show:true
        })
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