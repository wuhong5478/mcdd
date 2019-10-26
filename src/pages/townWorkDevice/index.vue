<template>
  <div class="content" v-if="!flashing">
    <div class="content-nav">
      <common-nav-header :currentIndex="pageStatus.currentNavIndex" :itemText="pageConfig.navList" :itemList="pageConfig.navItemList" type="menu"></common-nav-header>
    </div>
    <div class="content-list">
      <scroll-view scroll-y @scrollToLower="handleReachBottom">
      <div class="content-list-item" v-for="(item, index) in pageData.deviceList" :key="index" @click="handleDetailClick(item.deviceName)">
        <device-card :config="item"></device-card>
      </div>
    </scroll-view>
  </div>
  </div>
</template>

<script>
  import deviceCard from '@/components/deviceCard'
  import commonNavHeader from '@/components/commonNavHeader'

  export default {
    components: {
      deviceCard,
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
          // setTimeout(() => {
          //   this.flashing = true
          //   this.$nextTick(() => {
          //     this.flashing = false
          //   })
          // }, 50)
        },
        deep: true
      },
      pageConfig: {
        handler: async function tmp () {
          this.pageStatus.currentPageIndex = 1
          try {
            this.pageData.deviceList = (await this.$request('/device/list', 'GET', {
              districtName: (this.pageConfig.navList[0] === '全部' || this.pageConfig.navList[0] === '园区') ? undefined : this.pageConfig.navList[0],
              pageIndex: this.pageStatus.currentPageIndex,
              pageSize: 10
            })).data.list
          } catch (e) {
            // dep => console.log(e)
          }
          // => 防止数据监听不到页面不重新渲染
          this.$mp.page.setData({ '$root[0].pageData': JSON.parse(JSON.stringify(this.pageData)) })
        },
        deep: true
      }
    },
    data () {
      return {
        flashing: false,
        pageConfig: {
          navList: ['园区'],
          navItemList: [
            [
              '全部',
              '鹏辉产业园',
              '润丰产业园',
              '国际会展中心二期',
              '国际会展中心一期',
              '中大产业园'
            ]
          ]
        },
        pageStatus: {
          currentNavIndex: {
            data: 9
          },
          currentPageIndex: 1
        },
        pageData: {
          deviceList: []
        }
      }
    },
    methods: {
      handleDetailClick (deviceName) {
        // dep => console.log('进入设备详情')
        const url = '../workDeviceDetail/main?deviceName=' + deviceName
        mpvue.navigateTo({
          url
        })
      },
      async handleReachBottom () {
        this.pageStatus.currentPageIndex++
        this.pageData.deviceList = [...this.pageData.deviceList, ...(await this.$request('/device/list', 'GET', {
          districtName: (this.pageConfig.navList[0] === '全部' || this.pageConfig.navList[0] === '园区') ? undefined : this.pageConfig.navList[0],
          pageIndex: this.pageStatus.currentPageIndex,
          pageSize: 10
        })).data.list]
      }
    },
    async onShow () {
      this.pageConfig = JSON.parse(JSON.stringify(this.pageConfig))
      this.pageStatus = JSON.parse(JSON.stringify(this.pageStatus))
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    .gray-background;
    position: relative;
    .content-nav {
      z-index: 9999;
    }
    .content-list {
      .padding-normal();
      .gray-background;
      height: calc(100% - 100rpx);
      // overflow: auto;
      scroll-view {
        height: 100%;
      }
      .content-list-item {
        margin-bottom: 20rpx;
      }
    }
  }
</style>
