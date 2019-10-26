<template>
  <div class="content" v-if="!flashing">
    <div class="content-search">
      <div class="page-section-demo">
        <div class="search-outer">
          <input class="search-input" placeholder="搜索" />
          <text class="search-cancel">取消</text>
        </div>
      </div>
    </div>
    <div class="content-nav">
      <common-nav-header :currentIndex="pageStatus.currentNavIndex" :itemText="pageConfig.navList" :itemList="pageConfig.navItemList" type="menu"></common-nav-header>
    </div>
    <div class="content-list">
      <scroll-view scroll-y @scrollToLower="handleReachBottom">
        <div class="content-list-item" v-for="(item, index) in pageData.problemList" :key="index" @click="handleItemClick(item)">
          <problem-card :config="item"></problem-card>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import problemCard from '@/components/problemCard'
  import commonNavHeader from '@/components/commonNavHeader'

  export default {
    components: {
      problemCard,
      commonNavHeader
    },
    watch: {
      pageStatus: {
        handler () {
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
            const levelEnum = ['', '特级重大', '重大', '较大', '一般']
            const statusEnum = ['', '未处理', '处理未确认', '处理未达标', '处理已确认']
            const parkObj = {
              '鹏辉产业园': 1109,
              '润丰产业园': 1108,
              '国际会展中心二期': 1106,
              '国际会展中心一期': 1110,
              '中大产业园': 1107
            }
            this.pageData.problemList = (await this.$request('/AppWarning/AppWarning', 'GET', {
              pageNo: this.pageStatus.currentPageIndex,
              pageSize: 10,
              parkId: (parkObj[this.pageConfig.navList[0]] === -1) ? undefined : parkObj[this.pageConfig.navList[0]],
              institutionType: 0,
              level: (levelEnum.indexOf(this.pageConfig.navList[1]) === -1) ? undefined : levelEnum.indexOf(this.pageConfig.navList[1]),
              workOrderStates: (statusEnum.indexOf(this.pageConfig.navList[2]) === -1) ? undefined : statusEnum.indexOf(this.pageConfig.navList[2])
            })).data.data.rows.map(item => ({
              type: item.type,
              status: item.workOrderStates,
              level: item.level,
              address: item.place,
              whole: item
            }))
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
          navList: ['园区', '隐患等级', '隐患状态'],
          navItemList: [
            [
              '全部',
              '鹏辉产业园',
              '润丰产业园',
              '国际会展中心二期',
              '国际会展中心一期',
              '中大产业园'
            ],
            [
              '全部',
              '特级重大',
              '重大',
              '较大',
              '一般'
            ],
            [
              '全部',
              '未处理',
              '处理未确认',
              '处理未达标',
              '处理已确认'
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
          problemList: [{
            device: '消防通道堵塞',
            status: 1,
            type: 0,
            address: '国际会展中心一期'
          }, {
            device: '消防通道堵塞',
            status: 1,
            type: 1,
            address: '国际会展中心一期'
          }, {
            device: '消防通道堵塞',
            status: 0,
            type: 1,
            address: '国际会展中心一期'
          }, {
            device: '消防通道堵塞',
            status: 0,
            type: 0,
            address: '国际会展中心一期'
          }]
        }
      }
    },
    async onShow () {
      this.pageConfig = JSON.parse(JSON.stringify(this.pageConfig))
      this.pageStatus = JSON.parse(JSON.stringify(this.pageStatus))
    },
    created () {},
    methods: {
      handleItemClick (item) {
        mpvue.navigateTo({
          url: `../homeProblemDetail/main?item=${JSON.stringify(item.whole)}`
        })
      },
      async handleReachBottom () {
        this.pageStatus.currentPageIndex++
        const levelEnum = ['', '特级重大', '重大', '较大', '一般']
        const statusEnum = ['', '未处理', '处理未确认', '处理未达标', '处理已确认']
        const parkObj = {
          '鹏辉产业园': 1109,
          '润丰产业园': 1108,
          '国际会展中心二期': 1106,
          '国际会展中心一期': 1110,
          '中大产业园': 1107
        }
        this.pageData.problemList = [...this.pageData.problemList, ...(await this.$request('/AppWarning/AppWarning', 'GET', {
          pageNo: this.pageStatus.currentPageIndex,
          pageSize: 10,
          parkId: (parkObj[this.pageConfig.navList[0]] === -1) ? undefined : parkObj[this.pageConfig.navList[0]],
          institutionType: 0,
          level: (levelEnum.indexOf(this.pageConfig.navList[1]) === -1) ? undefined : levelEnum.indexOf(this.pageConfig.navList[1]),
          workOrderStates: (statusEnum.indexOf(this.pageConfig.navList[2]) === -1) ? undefined : statusEnum.indexOf(this.pageConfig.navList[2])
        })).data.data.rows.map(item => ({
          device: item.hiddangerName,
          status: item.workOrderStates,
          type: item.level,
          address: item.place,
          whole: item
        }))]
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    .gray-background;
    position: relative;
    .content-search {
      height: 90rpx;
    }
    .content-nav {
      z-index: 9999;
    }
    .content-list {
      .padding-normal();
      .gray-background;
      height: calc(100% - 220rpx);
      // overflow: auto;
      scroll-view {
        height: 100%;
      }
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
  }

  .search-outer {
    box-sizing: border-box;
    display: flex;
    height: 40px;
    overflow: hidden;
    padding: 8px;
    background-color: #efeff4;
  }

  .search-outer * {
    box-sizing: border-box;
  }

  .search-input {
    flex: 1;
    text-align: left;
    display: block;
    color: #000;
    height: 24px;
    font-size: 15px;
    background-color: #fff;
    border-color: transparent;
  }

  .search-input:focus+.search-cancel {
    margin-right: 0;
    opacity: 1;
  }

  .search-cancel {
    margin-right: -40px;
    display: inline-block;
    opacity: 0;
    padding-left: 8px;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    color: #108ee9;
    text-align: right;
    transition: margin-right .3s, opacity .3s;
    transition-delay: .1s;
  }
</style>
