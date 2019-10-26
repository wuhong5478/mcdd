<template>
  <div class="content">
    <div style="height:60rpx;border-bottom: #bcbcbc;border-bottom-style: solid;border-bottom-width: 1rpx;" v-for="item in pageData.townList" :key="item.areaId" @click="handleTownItemClick(item)">
      <div style="padding: 10rpx;">{{item.areaName}}<span style="float:right;"> &gt; </span></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageData: {
          townList: []
        }
      }
    },
    components: {
    },
    computed: {},
    methods: {
      async getFlashPager () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        this.pageData.townList = (await this.$request('/maintenanceManage/selectParkByPropertyId', 'POST', {
          propertyId: userInfo.deptId
        })).data.data
      },
      handleTownItemClick (item) {
        const areaItem = {id: item.areaId, name: item.areaName}
        mpvue.navigateTo({
          url: `../townGeneral/main?item=${JSON.stringify(areaItem)}`
        })
      }
    },
    mounted () {
    },
    onLoad () {
      this.getFlashPager()
    }
  }
</script>

<style lang="less" scoped>
  .content {
  }
</style>
