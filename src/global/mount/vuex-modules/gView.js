const state = {
  gDialogObject: {
    title: '默认标题',
    content: '默认内容',
    showCancel: true,
    success (res) {
      // if (res.confirm) // dep => // dep => console.log('触发确认事件')
    }
  }
}

const getters = {
}

const mutations = {
  setDialogObject (state, { title = '默认标题', content = '默认内容', btns = null, showCancel = true, success = () => {} } = {}) {
    if (title !== '默认标题') state.gDialogObject.title = title + '?' + new Date()
    else state.gDialogObject.title = title
    state.gDialogObject.content = content
    state.gDialogObject.showCancel = showCancel
    state.gDialogObject.success = success
    state.gDialogObject.btns = btns
    // dep => // dep => console.log('vuex.mutations.setDialogObject: ', state.gDialogObject)
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
