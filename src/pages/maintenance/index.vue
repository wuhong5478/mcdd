<template>
  <div class="content" v-if="!flashing">
    <div class="content-nav">
      <common-nav-header :currentIndex="pageStatus.currentNavIndex" :itemText="pageConfig.navList"></common-nav-header>
    </div>
    <div class="content-list" v-if="pageData.taskList.length > 0">
      <div class="content-list-item" v-for="(item, index) in pageData.taskList" :key="item.id" @click="handleItemClick(item)">
        <task-card :config="item"></task-card>
      </div>
    </div>
  </div>
</template>

<script>
  import taskCard from '@/components/taskCard'
  import commonNavHeader from '@/components/commonNavHeader'

  export default {
    components: {
      taskCard,
      commonNavHeader
    },
    watch: {
      pageStatus: {
        handler: async function pageStatusHandler () {
          let status = 4
          if (this.pageStatus.currentNavIndex.data === 1) {
             status = 2
          } else if (this.pageStatus.currentNavIndex.data === 2) {
            status = 3
          }
          try {
            const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
            const role = mpvue.getStorageSync({key: 'role'}).data

            if (role === 'wbry') {
              this.pageData.taskList = ((await this.$request('/appMaintenance/selectByCriteria', 'POST', {
                userId: userInfo.id,
                status: status
              })).data.data || []).map(item => ({
                id: item.id,
                title: item.routingName,
                deadLine: new Date(parseInt(item.planFinishTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
              }))
            } else if (role === 'wbjl' || role === 'gwh') {
              this.pageData.taskList = ((await this.$request('/appMaintenance/selectByDeptId', 'POST', {
                deptId: userInfo.deptId,
                status: status
              })).data.data || []).map(item => ({
                id: item.id,
                title: item.routingName,
                deadLine: new Date(parseInt(item.planFinishTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
              }))
            }

            console.log('currenIndex', this.pageData.taskList)
          } catch (e) {
            // dep => console.log('error: ', e)
            this.pageData.taskList = []
          }
          console.log('currenIndex', this.pageData.taskList)
          this.$mp.page.setData({ '$root[0].pageData': JSON.parse(JSON.stringify(this.pageData)) })
          setTimeout(() => {
            console.log('111111')
            this.flashing = true
            this.$nextTick(() => {
              console.log('222222')
              this.flashing = false
            })
          }, 50)
          // this.pageStatus.currentNavIndex = JSON.parse(JSON.stringify(this.pageStatus.currentNavIndex))
        },
        deep: true
      }
    },
    data () {
      return {
        flashing: false,
        pageConfig: {
          navList: ['超时', '未完成', '已完成']
        },
        pageStatus: {
          currentNavIndex: {
            data: 0
          }
        },
        pageData: {
          taskList: []
        }
      }
    },

    created () {},
    onShow () {
      this.pageStatus = JSON.parse(JSON.stringify(this.pageStatus))
    },
    methods: {
      handleItemClick (item) {
        mpvue.navigateTo({
          url: `../maintenanceObject/main?id=${item.id}`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    .gray-background;
    position: relative;
    .content-list {
      height: calc(100% - 100rpx);
      overflow: auto;
    }
    .content-scan {
      .flex-row(center, center);
      height: 100rpx;
      width: 100rpx;
      .border-radius-circle();
      background: @color-main;
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      img {
        height: 50rpx;
        width: 50rpx;
      }
    }
  }
</style>
