import Vue from 'vue'
import App from './App'
import Global from './global/mount'

// 自定义挂载
Vue.use(Global)

// 设置程序类型字段
App.mpType = 'app'

// 挂载并渲染程序
const app = new Vue(App)
app.$mount()
