<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-info">
        <div class="content-top-info-item" v-for="item in pageData.infoList">
          <div class="content-top-info-item-value">{{item.value}}</div>
          <div class="content-top-info-item-key">{{item.key}}</div>
        </div>
      </div>
      <div class="content-top-bar">
        <div class="content-top-bar-item" v-for="item in pageConfig.tabList" :key="item.title" @click="handleNavClick(item)">
          <div class="content-top-bar-item-icon">
            <img :src="item.icon" :style="item.style">
          </div>
          <div class="content-top-bar-item-title">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
    <div class="content-main">
      <div class="content-main-item" v-for="item in pageConfig.navList" :key="item.title" @click="handleNavClick(item)">
        <div class="content-main-item-icon">
          <img :src="item.icon" :style="item.style">
        </div>
        <div class="content-main-item-title">
          {{item.title}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    name: 'MaintenanceJob',
    data () {
      return {
        pageConfig: {
          tabList: [{
            title: '待分配',
            icon: '/static/images/work/dfp_tab_icon.png',
            url: '../jobCtask/main?status=0',
            style: {
              height: '52rpx',
              width: '54rpx'
            }
          }, {
            title: '待处理',
            icon: '/static/images/work/dwc_tab_icon.png',
            url: '../jobCtask/main?status=1',
            style: {
              height: '56rpx',
              width: '60rpx'
            }
          }, {
            title: '待确认',
            icon: '/static/images/work/wqr_tab_icon.png',
            url: '../jobCtask/main?status=2',
            style: {
              height: '56rpx',
              width: '56rpx'
            }
          }, {
            title: '已处理',
            icon: '/static/images/work/confirm_tab_icon.png',
            url: '../jobCtask/main?status=3',
            style: {
              height: '56rpx',
              width: '56rpx'
            }
          }],
          navList: [{
            title: '新增隐患',
            icon: '/static/images/work/add_gray_icon.png',
            url: '../jobCproblem/main',
            style: {
              height: '42rpx',
              width: '36rpx'
            }
          }, {
            title: '我的消息',
            icon: '/static/images/work/msg_gray_icon.png',
            url: '../userMsg/main',
            style: {
              height: '36rpx',
              width: '36rpx'
            }
          }]
        },
        pageData: {
          infoList: [{
            key: '隐患',
            value: '128'
          }, {
            key: '巡检',
            value: '108'
          }]
        }
      }
    },
    methods: {
      async handleFlashPage () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        const role = mpvue.getStorageSync({key: 'role'}).data

        let patrolNum = 0
        let warnNum = 0
        if (role === 'wbry') {
           patrolNum = (await this.$request('/appStatistics/countDeviceRouting', 'POST', {
            userId: userInfo.id
          })).data.data

           warnNum = (await this.$request('/appStatistics/countHiddenWarn', 'POST', {
             userId: userInfo.id
          })).data.data
        } else if (role === 'wbjl') {
          patrolNum = (await this.$request('/appStatistics/countDeviceRouting', 'POST', {
            deptId: userInfo.deptId
          })).data.data

          warnNum = (await this.$request('/appStatistics/countHiddenWarn', 'POST', {
            deptId: userInfo.deptId
          })).data.data
        }

          this.pageData.infoList = [{
          key: '隐患',
          value: warnNum
        }, {
          key: '巡检',
          value: patrolNum
        }]
        this.$forceUpdate()
      },
      handleNavClick ({ url }) {
        if (url) {
          mpvue.navigateTo({
            url
          })
        }
      }
    },
    created () {
      this.handleFlashPage()
    },
    onShow () {
      this.handleFlashPage()
    }
  }
</script>

<style lang="less" scoped>
  .content {
    background: rgba(241, 241, 241, 1);
    .content-top {
      background: linear-gradient(360deg, rgba(32, 128, 217, 1) 0%, rgba(29, 129, 222, 1) 100%);
      padding: 30px 20rpx;
      height: 220rpx;
      margin-bottom: 120rpx;
      .content-top-info {
        padding: 30rpx 200rpx;
        .flex-row(center, space-between);
        .content-top-info-item {
          height: 50px;
          .flex-column(center, space-between);
          .content-top-info-item-value {
            font-size: 48rpx;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
          .content-top-info-item-key {
            font-size: 28rpx;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      .content-top-bar {
        z-index: 9;
        background: white;
        border-radius: 5px;
        padding: 50rpx 20rpx;
        .flex-row(center, space-around);
        .content-top-bar-item {
          .flex-column(center, center);
          .content-top-bar-item-title {
            font-size: 28rpx;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 60rpx;
          }
        }
      }
    }
    .content-main {
      background: white;
      .content-main-item {
        height: 108rpx;
        margin: 0 30rpx;
        border-bottom: 2rpx solid rgba(237, 237, 237, 1);
        .flex-row(center);
        .content-main-item-icon {
          width: 40rpx;
          margin-right: 20rpx;
        }
        .content-main-item-title {
          font-size: 32rpx;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
</style>
