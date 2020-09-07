Component({
  properties: {
    recordList:{
      type: Array
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: 1
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () {
      console.log('customMethod')
    }
  }
})