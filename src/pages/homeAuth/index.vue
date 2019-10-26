<template>
  <home v-if="role== 'wyry'"></home>
  <town v-else-if="role== 'gwh'"></town>
  <maintenance-home v-else-if="role== 'wbry'"></maintenance-home>
  <maintenance-home v-else-if="role== 'wbjl'"></maintenance-home>
  <pro-manager-home v-else-if="role== 'wyjl'"></pro-manager-home>
</template>

<script>
  import Home from '@/pages/home/index.vue'
  import Town from '@/pages/town/index.vue'
  import MaintenanceHome from '@/pages/maintenanceHome/index.vue'
  import proManagerHome from '@/pages/proManagerHome/index.vue'
  export default {
    components: {Home, Town, MaintenanceHome, proManagerHome},

    data () {
      return {
        role: ''
      }
    },
    methods: {},
    onShow () {
      mpvue.getAuthCode({
        success: (res) => {
          this.role = mpvue.getStorageSync({key: 'role'}).data
          this.$forceUpdate()
        }
      })
      // this.role = mpvue.getStorageSync({key: 'role'}).data
    },
    created () {}
  }
</script>

<style lang="less" scoped>

</style>
