// components/list/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab:{
      type:Object
    },
    goods:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    good:[]
  },

  
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      // this.properties.goods  //区别
        var good =  this.properties.goods.filter(item=>item.type.value==this.properties.tab.value);//同步修改值，视图不刷新
        this.setData({  //此处视图才刷新
          good
        })
     },
    moved: function () { },
    detached: function () { },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
