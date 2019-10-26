/* 全局挂载 */
import Vuex from 'vuex'
import modules from './vuex-modules' // 自动化vuex模块生成
import request from '../util/request.js' // 自定义请求封装
import moment from 'moment'
import GCommonDialogRegister from '@/components/GCommonDialogRegister'

// Deprecated
import * as util from '@/global/util/tool.js' // 自定义工具函数
// import moment from 'moment' // 时间格式插件
// import md5 from 'js-md5' // md5加密插件

let globalMount = {
  install: (Vue) => {
    /* 阻止启动生产消息 */
    Vue.config.productionTip = false

    /* 挂载全局状态管理 */
    Vue.use(Vuex)
    Vue.prototype.$store = new Vuex.Store({
      /* Tips: Convert [modules: {...}] To This by Regular */
      modules,
      strict: process.env.NODE_ENV !== 'production'
    })

    /* 自定义请求封装 */
    Vue.prototype.$request = request

    /* 常用工具函数 */
    Vue.prototype.$util = util

    /* 时间格式化工具 */
    Vue.prototype.$moment = moment

    /* 自定义请求封装 */
    // Vue.prototype.$md5 = md5

    /* 全局函数式组件 */
    Vue.use(GCommonDialogRegister)
  }
}

export default globalMount
