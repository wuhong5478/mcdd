<template>
  <div class="content">
    <div class="content-nav">
      <common-nav-header :currentIndex="pageStatus.currentNavIndex" :itemText="pageConfig.navList"></common-nav-header>
    </div>
    <div class="content-list">
      <div class="content-list-item" v-for="(item, index) in pageData.alertList" :key="index">
        <alert-card :config="item"></alert-card>
      </div>
    </div>
  </div>
</template>

<script>
  import alertCard from '@/components/alertCard'
  import commonNavHeader from '@/components/commonNavHeader'
  
  export default {
    components: {
      alertCard,
      commonNavHeader
    },
  
    data () {
      return {
        pageConfig: {
          navList: ['火警', '误报', '未处理']
        },
        pageStatus: {
          currentNavIndex: {
            data: 0
          }
        },
        pageData: {
          alertList: [{
            reason: '1楼中控室信息传输装备',
            createTime: '2019-08-02 19:12',
            updateTime: '2019-08-03 08:23',
            address: '云栖小镇A区2号楼',
            device: '21e2d1e2-2131-321312dwqd-213sdfwad',
            terminal: '主机号：1；回路号：5；设备号：14'
          }, {
            reason: '1楼中控室信息传输装备',
            createTime: '2019-08-02 19:12',
            updateTime: '2019-08-03 08:23',
            address: '云栖小镇A区2号楼',
            device: '21e2d1e2-2131-321312dwqd-213sdfwad',
            terminal: '主机号：1；回路号：5；设备号：14'
          }, {
            reason: '1楼中控室信息传输装备',
            createTime: '2019-08-02 19:12',
            updateTime: '2019-08-03 08:23',
            address: '云栖小镇A区2号楼',
            device: '21e2d1e2-2131-321312dwqd-213sdfwad',
            terminal: '主机号：1；回路号：5；设备号：14'
          }, {
            reason: '1楼中控室信息传输装备',
            createTime: '2019-08-02 19:12',
            updateTime: '2019-08-03 08:23',
            address: '云栖小镇A区2号楼',
            device: '21e2d1e2-2131-321312dwqd-213sdfwad',
            terminal: '主机号：1；回路号：5；设备号：14'
          }]
        }
      }
    },
  
    created () {}
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    .gray-background;
    .content-list {
      height: calc(100% - 100rpx);
      overflow: auto;
    }
  }
</style>
