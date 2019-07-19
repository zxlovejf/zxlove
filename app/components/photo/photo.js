// components/photo/photo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    src:"",
    flag:false,
    latitude:"",
    longitude:""
  },
  lifetimes: {
      // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
      attached: function () {
        this.showCanvas();
        wx.getLocation({
          type: 'wgs84',
          success: (res)=> {
            const latitude = res.latitude
            const longitude = res.longitude
            const speed = res.speed
            const accuracy = res.accuracy;
            this.setData({
              latitude,
              longitude
            })
          }
        })
      
       },
      moved: function () { },
      detached: function () { },
  },
  /**
   * 组件的方法列表
   */
  methods: {

    showCanvas(){
      console.log('canvas');
      // 使用 wx.createContext 获取绘图上下文 context
        var context = wx.createCanvasContext('firstCanvas')

        context.setStrokeStyle("#00ff00")
        context.setLineWidth(5)
        context.rect(0, 0, 200, 200)
        context.stroke()
        context.setStrokeStyle("#ff0000")
        context.setLineWidth(2)
        context.moveTo(160, 100)
        context.arc(100, 100, 60, 0, 2 * Math.PI, true)
        context.moveTo(140, 100)
        context.arc(100, 100, 40, 0, Math.PI, false)
        context.moveTo(85, 80)
        context.arc(80, 80, 5, 0, 2 * Math.PI, true)
        context.moveTo(125, 80)
        context.arc(120, 80, 5, 0, 2 * Math.PI, true)
        context.stroke()
        context.draw()
    },
    startPhoto() {
      // 相机组件 
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.setData({
            src: res.tempImagePath
          })
        }
      })
    },
    error(e) {
      console.log(e.detail)
    },

    startScan(){
      wx.scanCode({
        success (res) {
          console.log(res)
        }
      })
    },
      takePhoto(){
        this.setData({
          flag:!this.data.flag
        })
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: (res)=> {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths;
            this.setData({
              src:tempFilePaths
            })
          }
        })
      }
  
  }
})
