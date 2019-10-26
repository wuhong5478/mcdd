<template>
  <div class="content" v-if="!flashing">
    <div class="content-search">
      <div class="page-section-demo">
        <div class="search-outer">
          <input class="search-input" v-model="pageConfig.address" placeholder="搜索" confirm-type="search" @confirm="confirmSearch"/>
          <text class="search-cancel">取消</text>
        </div>
      </div>
    </div>
    <div class="content-nav">
      <common-nav-header :currentIndex="pageStatus.currentNavIndex" :itemText="pageConfig.navList" :itemList="pageConfig.navItemList" type="menu"></common-nav-header>
    </div>
    <div class="content-list">
      <div class="content-list-item" v-for="(item, index) in pageData.problemList" :key="index" @click="handleItemClick(item)">
        <alerts-card :config="item"></alerts-card>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import alertsCard from '@/components/alertsCard'
  import commonNavHeader from '@/components/commonNavHeader'

  export default {
    components: {
      alertsCard,
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
          const isTrueEnum = ['待确认', '火警', '误报']
          const waysEnum = ['IOT', '北斗', '一键报警']
          const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
          this.pageData.problemList = (await this.$request('/AppFire/selectByCriteria', 'POST', {
            address: this.pageConfig.address,
            deptId: userInfo.deptId,
            isTrue: (isTrueEnum.indexOf(this.pageConfig.navList[1]) === -1) ? undefined : isTrueEnum.indexOf(this.pageConfig.navList[1]),
            ways: (waysEnum.indexOf(this.pageConfig.navList[0]) === -1) ? undefined : waysEnum.indexOf(this.pageConfig.navList[0]) + 1
          })).data.data.map(item => ({
            device: item.devname,
            status: item.istrue,
            date: moment(item.gmtcreate).format('YYYY-MM-DD h:mm'),
            address: item.address,
            whole: item
          }))
          this.$mp.page.setData({ '$root[0].pageData': JSON.parse(JSON.stringify(this.pageData)) })
        },
        deep: true
      }
    },
    data () {
      return {
        flashing: false,
        pageConfig: {
          address: '',
          navList: ['火警来源', '火灾状态'],
          navItemList: [
            [
              '全部',
              'IOT',
              '北斗',
              '一键报警'
            ],
            [
              '全部',
              '误报',
              '待确认',
              '火警'
            ]
          ]
        },
        pageStatus: {
          currentNavIndex: {
            data: 9
          }
        },
        pageData: {
          problemList: []
        }
      }
    },
    async onShow () {
      this.pageConfig = JSON.parse(JSON.stringify(this.pageConfig))
    },
    created () {},
    methods: {
      handleItemClick (item) {
        mpvue.navigateTo({
          url: `../homeAlertMapDetail/main?item=${JSON.stringify(item.whole)}`
        })
      },
      confirmSearch () {
        console.log('confirmSearch')
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
