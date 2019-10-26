<template>
  <job v-if="role== 'wyry'"></job>
  <maintenance-job v-else-if="role== 'wbry'"></maintenance-job>
  <maintenance-job v-else-if="role== 'wbjl'"></maintenance-job>
  <work v-else-if="role== 'gwh'"></work>
  <pro-manager-job v-else-if="role== 'wyjl'"></pro-manager-job>
</template>

<script>
  import Job from '@/pages/job/index.vue'
  import MaintenanceJob from '@/pages/maintenanceJob/index.vue'
  import Work from '@/pages/work/index.vue'
  import ProManagerJob from '@/pages/proManagerJob/index.vue'

  export default {
    components: {Job, MaintenanceJob, Work, ProManagerJob},

    data () {
      return {
        role: ''
      }
    },
    methods: {},
    onShow () {
          this.role = mpvue.getStorageSync({key: 'role'}).data
    },
    created () {}
  }
</script>

<style lang="less" scoped>

</style>
