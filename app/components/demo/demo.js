// components/demo/demo.js

// Component()
// properties  ===> props 
// data  初始化数据 
// methods 方法
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 这些都是父传子的值
    id:{
      type:String,
      value:"8888"  //这里又给了值，覆盖掉父传的值
    },
    imgUrl:{
      type:String
    },
    // 父修改子的值，直接改props
    num:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    word:"今天哈哈哈",
    count:1314
  },

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      console.log("attached  组件载入 ")
     },
    moved: function () { },
    detached: function () { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeCount(){
      this.setData({
        count:++this.data.count
      })
    },
    changeParent(){
      // 自定义事件  
      var myEventDetail = { //
        value:"今天很开心"
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent("myevnet",myEventDetail,myEventOption)
      // myevnet时子组件自定义事件名   父组件home中    bindmyevnet="changeword"
    },
  }
})
