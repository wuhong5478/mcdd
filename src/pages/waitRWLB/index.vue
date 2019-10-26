<template>
  <div class="content">
        <div class="content-nav">
      <common-nav-header :itemText="pageConfig.navList" type="menu"></common-nav-header>
    </div>
    <div class="content-list">
      <div class="content-list-item" v-for="(item, index) in pageData.missionList" :key="index">
        <mission-card :config="item"></mission-card>
      </div>
    </div>
    <div class="content-bottom">
      总计10个待处理任务
    </div>
  </div>
</template>

<script>
  import missionCard from '@/components/missionCard'
  import commonNavHeader from '@/components/commonNavHeader'

  export default {
    data () {
      return {
        pageConfig: {
          navList: ['任务类型']
        },
        pageData: {
          missionList: [{
            name: '消防通道堵塞',
            address: '国际会展中心一期',
            type: 0
          }, {
            name: '消防通道堵塞',
            address: '国际会展中心一期',
            type: 0
          }, {
            name: '消防通道堵塞',
            address: '国际会展中心一期',
            type: 0
          }, {
            name: '消防通道堵塞',
            address: '国际会展中心一期',
            type: 0
          }]
        }
      }
    },
    components: {
      missionCard,
      commonNavHeader
    },
    computed: {},
    methods: {},
    mounted () {}
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    background: rgba(247,247,247,1);
    .content-bottom {
      text-align: center;
      font-size: 24rpx;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .content-list {
      .padding-normal();
      .content-list-item {
        margin-bottom: 20rpx;
      }
    }
  }
</style>
