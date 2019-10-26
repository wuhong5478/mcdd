import vue from 'vue'
import { mapMutations, mapState } from 'vuex'

function showDialog (obj) {
  // dep => console.log('fuck')
  let { setDialogObject } = mapMutations('gView', [
    'setDialogObject'
  ])
  try {
    setDialogObject.apply(this, [obj])
  } catch (e) {
    // dep => // dep => console.log('error', e)
  }
}

// 注册为全局组件的函数
function registryDialog () {
  vue.prototype.$dialog = showDialog
  // dep => // dep => console.log(vue)
}

export default registryDialog
