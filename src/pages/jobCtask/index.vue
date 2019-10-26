<template>
  <div class="content" v-if="!flashing">
    <div class="content-nav">
      <common-nav-header :currentIndex="pageStatus.currentNavIndex" :itemText="pageConfig.navList"
                         :itemList="pageConfig.navItemList" type="menu"></common-nav-header>
    </div>
    <div class="content-list">
      <div class="content-list-item" v-for="(item, index) in pageData.taskList" :key="index">
        <tasks-card :config="item"></tasks-card>
      </div>
    </div>
    <div class="content-bottom">
      总计{{pageData.taskListLength}}个{{statusName}}任务
    </div>
  </div>
</template>

<script>
  import tasksCard from '@/components/tasksCard'
import commonNavHeader from '@/components/commonNavHeader'

export default {
    components: {
      tasksCard,
      commonNavHeader
    },
    watch: {
      pageStatus: {
        handler () {
          // this.$mp.page.setData({ '$root[0].flashing': true })
          // this.$nextTick(() => {
          //   this.$mp.page.setData({ '$root[0].flashing': false })
          //   console.log('我诶集', this)
          //   this.$forceUpdate()
          // })

          // setTimout使得事件在事件队列最后执行 否则会出现奇怪的bug 浪费了一天时间
          setTimeout(() => {
            this.flashing = true
          this.$nextTick(() => {
              this.flashing = false
          })
        }, 50)
      },
        deep: true
      },
      pageConfig: {
        handler: async function tmp () {
          const taskTypeEnum = ['隐患任务', '火警任务', '巡检任务']
          let pageQuery = {
            taskType: (taskTypeEnum.indexOf(this.pageConfig.navList[0]) === -1) ? undefined : taskTypeEnum.indexOf(this.pageConfig.navList[0]),
            status: this.status
          }
          const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
          const role = mpvue.getStorageSync({key: 'role'}).data
          if (role === 'wyry' || role === 'wbry') {
            pageQuery.userId = userInfo.id
          } else if (role === 'wyjl' || role === 'wbjl') {
            pageQuery.deptId = userInfo.deptId
          }
        this.pageData.taskList = (await this.$request('/work/selectTaskByType', 'POST', pageQuery)).data.data.map(item => ({
            taskAddress: item.taskAddress,
            taskName: item.taskName,
            taskType: item.taskType,
            whole: item
          }))
        this.$mp.page.setData({ '$root[0].pageData': JSON.parse(JSON.stringify(this.pageData)) })
        this.pageData.taskListLength = this.pageData.taskList.length
      },
        deep: true
      }
    },
    data () {
      return {
        flashing: false,
        status: '',
        statusName: '',
        pageConfig: {
          navList: ['任务类型'],
          navItemList: [
            [
              '全部',
              '隐患任务',
              '火警任务',
              '巡检任务'
            ]
          ]
        },
        pageStatus: {
          currentNavIndex: {
            data: 9
          }
        },
        pageData: {
          taskList: [],
          taskListLength: 0
        }
      }
  },
    onLoad (options) {
      this.status = options.status
    const statusObj = { 0: '待分配', 1: '待处理', 2: '待确认', 3: '已处理', 4: '已超时' }
    this.statusName = statusObj[this.status]
  },
    async onShow () {
      this.pageConfig = JSON.parse(JSON.stringify(this.pageConfig))
    mpvue.setNavigationBar({
        title: this.statusName
      })
  },
    created () {
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    .gray-background;
    position: relative;
    .content-list {
      .padding-normal();
      .gray-background;
      height: calc(100% - 220rpx);
      overflow: auto;
      .content-list-item {
        margin-bottom: 20rpx;
      }
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

    .content-bottom {
      text-align: center;
      font-size: 24rpx;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin: 20rpx;
    }
  }
</style>
