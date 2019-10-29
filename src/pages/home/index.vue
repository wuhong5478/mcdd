<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-bar">
        <div class="content-top-bar-item" v-for="item in pageConfig.tabList" :key="item.title"
             @click="handleTabClick(item.url)">
          <div class="content-top-bar-item-icon">
            <img :src="item.icon" :style="item.style">
          </div>
          <div class="content-top-bar-item-title">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
    <div class="content-notic" @click="handleNoticeClick">
      <div class="content-notic-content">
        <div class="content-notic-content-icon">
          <img src="/static/images/work/notic_blue_icon.png">
        </div>
        <div class="content-notic-content-title">
          最新公告
        </div>
        <div class="content-notic-content-main">
          {{notice.title}}
        </div>
        <div class="content-notic-content-more">
          <img src="/static/images/work/more_gray_icon.png">
        </div>
      </div>
    </div>
    <div class="content-alert">
      <div class="content-X-title">
        火情报警
      </div>
      <div class="content-alert-main">
        <div class="content-alert-main-item" v-for="item in trueAlertList" :key="item"
             @click="handleTownAlertItemClick(item.whole)">
          <div class="content-alert-main-item-top">
            <div class="content-alert-main-item-top-title">{{item.title}}</div>
            <div class="content-alert-main-item-top-time">{{item.time}}</div>
          </div>
          <div class="content-alert-main-item-bottom">
            <div class="content-alert-main-item-bottom-address">
              {{item.address}}
            </div>
            <div class="content-alert-main-item-bottom-date">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-mission">
      <div class="content-X-title">
        火警报警
      </div>
      <div class="content-mission-main">
        <div class="content-mission-main-item" v-for="item in mayAlertList" :key="item"
             @click="handleAlertItemClick(item.whole)">
          <div class="content-mission-main-item-top">
            <div class="content-mission-main-item-top-title">{{item.title}}</div>
            <div class="content-mission-main-item-top-time">{{item.time}}</div>
          </div>
          <div class="content-mission-main-item-bottom">
            <div class="content-mission-main-item-bottom-address">
              {{item.address}}
            </div>
            <div class="content-mission-main-item-bottom-date">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-patrol">
      <div class="content-X-title">
        待办巡检
      </div>
      <div class="content-patrol-main">
        <div class="content-patrol-main-item" v-for="item in patrolList" :key="item"
             :style="{ 'background-image': 'url(' + item.back + ')' }" @click="handlePatrolItemClick(item.whole)">
          <div class="content-patrol-main-item-title">
            {{item.title}}
          </div>
          <div class="content-patrol-main-item-start">
            {{item.start}}
          </div>
        </div>
      </div>
    </div>
    <div class="content-problem">
      <div class="content-X-title">
        待办隐患
      </div>
      <div class="content-problem-main">
        <div class="content-problem-main-item" v-for="item in problemList" :key="item"
             @click="handleProblemItemClick(item.whole)">
          <div class="content-problem-main-item-top">
            <div class="content-problem-main-item-top-title">{{item.title}}</div>
          </div>
          <div class="content-problem-main-item-bottom">
            <div class="content-problem-main-item-bottom-address">{{item.address}}</div>
            <div class="content-problem-main-item-bottom-date">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-news">
      <div class="content-X-title">
        综合资讯
      </div>
      <div class="content-news-main">
        <div class="content-news-main-item" v-for="item in newsList" :key="item" @click="handleNewsItemClick">
          <div class="content-news-main-item-left">
            <img :src="item.img">
          </div>
          <div class="content-news-main-item-right">
            <div class="content-news-main-item-right-title">
              {{item.title}}
            </div>
            <div class="content-news-main-item-right-info">{{item.author}} {{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {},
    data () {
      return {
        pageConfig: {
          statusEnum: [{
            label: '待处理',
            color: '#FF5050'
          }, {
            label: '处理中',
            color: '#1D81DE'
          }],
          tabList: [{
            title: '火警',
            url: '../homeAlert/main',
            icon: '/static/images/work/xiaofang_tab_icon.png',
            style: {
              height: '82rpx',
              width: '68rpx'
            }
          }, {
            title: '隐患',
            url: '../homeProblem/main',
            icon: '/static/images/work/kucun_tab_icon.png',
            style: {
              height: '78rpx',
              width: '66rpx'
            }
          }, {
            title: '巡查',
            url: '../homeCheck/main',
            icon: '/static/images/work/sousuo_tab_icon.png',
            style: {
              height: '70rpx',
              width: '88rpx'
            }
          }, {
            title: '学习',
            url: '../homeExam/main',
            icon: '/static/images/work/fenlei_tab_icon.png',
            style: {
              height: '76rpx',
              width: '76rpx'
            }
          }]
        },
          notice: '',
          trueAlertList: [],
          mayAlertList: [],
          patrolList: [],
          problemList: [],
          newsList: []
        }
  },
    methods: {
      async handleFlashPage () {
        let userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        this.trueAlertList = (await this.$request('/AppFire/selectByCriteria', 'POST', {
          deptId: userInfo.deptId,
          status: 2,
          isTrue: 1
        })).data.data.map(item => ({
          title: item.devname,
          status: item.istrue,
          time: this.$moment(item.gmtcreate).format('h:mm'),
          date: this.$moment(item.gmtcreate).format('YYYY-MM-DD'),
          address: item.address,
          whole: item
        })).slice(0, 4)
      this.mayAlertList = (await this.$request('/AppFire/selectByCriteria', 'POST', {
          deptId: userInfo.deptId,
          isTrue: 0
        })).data.data.map(item => ({
          title: item.devname,
          status: item.istrue,
          time: this.$moment(item.gmtcreate).format('h:mm'),
          date: this.$moment(item.gmtcreate).format('YYYY-MM-DD'),
          address: item.address,
          whole: item
        })).slice(0, 4)

      this.problemList = (await this.$request('/AppWarning/AppWarning', 'GET', {
          pageNo: 1,
          pageSize: 3,
          institutionType: 2,
          workOrderStates: 1,
          userId: userInfo.id,
         maintenanceId: userInfo.deptId
        })).data.data.rows.map(item => ({
          title: item.hiddangerName,
          address: item.place,
          // date: `${Math.ceil((new Date().valueOf() - new Date(item.reportTime.replace(new RegExp('-', 'g'), '/')).valueOf()) / (1000 * 3600 * 24))}天`,
        date: this.$moment().diff(this.$moment(item.reportTime), 'day') + '天',
          whole: item
        }))
      this.newsList = (await this.$request('/newsList', 'GET', {
          userId: userInfo.id,
          page: 1,
          limit: 4
        })).data.data.list.map(item => ({
          title: item.title,
          author: item.author,
          img: 'http://118.31.247.145:8088/getPicture?picture=' + item.titleImg,
          date: this.$moment(item.createTime).format('YYYY-MM-DD'),
          whole: item
        }))
        let patrolList = (await this.$request('/PatrolInspection/selectByCriteria', 'POST', {
          userId: userInfo.id,
          routingStatus: 1
        })).data.data
        this.patrolList = []
        if (patrolList != null) {
          for (let i = 0; i < patrolList.length; i++) {
            if (i < 3) {
              this.patrolList.push(
                {title: patrolList[i].routingName,
                  start: this.$moment(patrolList[i].planFinishTime).format('YYYY-MM-DD'),
                  back: '/static/images/work/patrol_blue_back.png',
                  whole: patrolList[i]
                })
            }
          }
        }
        this.notice = (await this.$request('/lastMsgNewsDetail', 'GET', {
          userId: userInfo.id
        })).data.data.data
      this.$forceUpdate()
    },
      handleTabClick (url) {
        if (url) {
          mpvue.navigateTo({
            url
          })
      }
      },
      handleTownAlertItemClick (item) {
        mpvue.navigateTo({
          url: `../townAlert/main?item=${JSON.stringify(item)}`
        })
    },
      handleNoticeClick () {
        mpvue.navigateTo({
          url: `../newsDetail/main?item=${JSON.stringify(this.notice)}`
        })
      },
      handleTownAnalyzeClick () {
        mpvue.navigateTo({
          url: '../townAnalyze/main'
        })
    },
      handleAlertItemClick (item) {
        // mpvue.navigateTo({
        //   url: `../homeAlertDetail/main?item=${JSON.stringify(item)}`
        // })
        mpvue.navigateTo({
          url: `../homeAlertMap/main?item=${JSON.stringify(item)}`
        })
    },
      handleProblemItemClick (item) {
        mpvue.navigateTo({
          url: `../homeProblemDetail/main?item=${JSON.stringify(item)}`
        })
    },
      handleNewsItemClick () {
        mpvue.navigateTo({
          url: '../homeNews/main'
        })
    },
      handlePatrolItemClick (item) {
        mpvue.navigateTo({
          url: `../homeCheckObject/main?id=${item.id}`
        })
      }
    },
    onShow () {
      this.handleFlashPage()
  },
  created () {
      this.handleFlashPage()
  },
  async onPullDownRefresh () {
    await this.handleFlashPage()
    mpvue.stopPullDownRefresh()
      mpvue.showToast({
        type: 'success',
        content: '刷新成功',
        duration: 2000,
        success: () => {
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .content {
    background: rgba(241, 241, 241, 1);
    .content-top {
      background: linear-gradient(360deg, rgba(32, 128, 217, 1) 0%, rgba(29, 129, 222, 1) 100%);
      padding: 30px 20rpx;
      height: 120rpx;
      margin-bottom: 85rpx;
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
    .content-X-title {
      padding: 20rpx 0;
      .font-huge-bold();
      color: @color-text-main;
    }
    .content-notic {
      padding: 0 20rpx;
      background: white;
      .content-notic-content {
        padding: 20rpx 0;
        border-bottom: 1px solid rgba(237, 237, 237, 1);
        .flex-row(center);
        .content-notic-content-icon {
          img {
            height: 32rpx;
            width: 32rpx;
          }
        }
        .content-notic-content-title {
          font-size: 28rpx;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 40rpx;
          margin-right: 20rpx;
          margin-left: 10rpx;
        }
        .content-notic-content-main {
          flex: 1;
          font-size: 28rpx;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 40rpx;
        }
        .content-notic-content-more {
          img {
            height: 28rpx;
            width: 16rpx;
          }
        }
      }
    }
    .content-alert {
      padding: 0 20rpx;
      background: white;
      overflow: hidden;
      .content-alert-main {
        .content-alert-main-item {
          padding: 24rpx;
          margin-bottom: 20rpx;
          border-radius: 5px;
          height: 100rpx;
          background-image: url('/static/images/work/alert_item_back.png');
          background-size: 100% 100%;
          .flex-column(@JC: space-between);
          .content-alert-main-item-top {
            .flex-row(center,
              space-between);
            .content-alert-main-item-top-title {
              font-size: 28rpx;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
            .content-alert-main-item-top-time {
              font-size: 22rpx;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
          }
          .content-alert-main-item-bottom {
            .flex-row(center,
              space-between);
            .content-alert-main-item-bottom-address {
              font-size: 24rpx;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
            .content-alert-main-item-bottom-date {
              font-size: 24rpx;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
    .content-alertB {
      padding: 0 20rpx;
      background: white;
      overflow: hidden;
      .content-alertB-main {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .content-alertB-main-item {
          margin-bottom: 20rpx;
          display: flex;
          flex-direction: row;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
          .content-alertB-main-item-title {
            font-size: 28rpx;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 40rpx;
          }
          .content-alertB-main-item-address {
            font-size: 24rpx;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
            line-height: 34rpx;
          }
          .content-alertB-main-item-status {
            margin-top: 42rpx;
            font-size: 32rpx;
            font-weight: 500;
            color: rgba(29, 129, 222, 1);
            line-height: 44rpx;
          }
          .content-alertB-main-item-date {
            font-size: 24rpx;
            color: rgba(102, 102, 102, 1);
            line-height: 34rpx;
          }
          .content-alertB-main-item-left {
            flex: 1;
            margin: 32rpx;
          }
          .content-alertB-main-item-right {
            flex: 1;
            margin: 32rpx 0;
            padding: 0 32rpx;
            border-left: 2rpx solid rgba(237, 237, 237, 1);
          }
        }
      }
    }
    .content-comment {
      padding: 0 20rpx;
      background: white;
      .content-comment-main {
        height: 288rpx;
        background-image: url('/static/images/home/comment_blue_back.png');
        background-size: 100% 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .content-comment-main-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 74rpx 0 48rpx;
          .content-comment-main-left-title {
            font-size: 36rpx;
            font-weight: 500;
            color: white;
            line-height: 50rpx;
          }
          .content-comment-main-left-mark {
            font-size: 28rpx;
            color: white;
            line-height: 40rpx;
          }
          .content-comment-main-left-btn {
            padding: 20rpx 0;
            img {
              height: 30rpx;
              width: 154rpx;
            }
          }
        }
        .content-comment-main-right {
          img {
            height: 234rpx;
            width: 244rpx;
          }
        }
      }
    }
    .content-device {
      padding: 0 20rpx;
      background: white;
      .content-device-main {
        height: 160rpx;
        background-image: url('/static/images/home/device_blue_back.png');
        background-size: 100% 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        .content-device-main-left {
          flex: 1;
          .flex-column(center,
            center);
          .content-device-main-left-title {
            font-size: 32rpx;
            font-weight: 500;
            color: white;
            line-height: 44rpx;
          }
          .content-device-main-left-mark {
            font-size: 24rpx;
            font-weight: 500;
            color: white;
            line-height: 34rpx;
          }
        }
        .content-device-main-right {
          position: relative;
          top: -20rpx;
          flex: 1;
          img {
            height: 190rpx;
            width: 306rpx;
          }
        }
      }
    }
    .content-mission {
      padding: 0 20rpx;
      background: white;
      overflow: hidden;
      .content-mission-main {
        .content-mission-main-item {
          padding: 24rpx;
          margin-bottom: 20rpx;
          border-radius: 5px;
          height: 100rpx;
          background-image: url('/static/images/work/mission_item_back.png');
          background-size: 100% 100%;
          .flex-column(@JC: space-between);
          .content-mission-main-item-top {
            .flex-row(center,
              space-between);
            .content-mission-main-item-top-title {
              font-size: 28rpx;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
            .content-mission-main-item-top-time {
              font-size: 22rpx;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
            }
          }
          .content-mission-main-item-bottom {
            .flex-row(center,
              space-between);
            .content-mission-main-item-bottom-address {
              font-size: 24rpx;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
            .content-mission-main-item-bottom-date {
              font-size: 24rpx;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
    .content-patrol {
      padding: 0 0 20rpx 20rpx;
      background: white;
      .content-patrol-main {
        .flex-row(center);
        .content-patrol-main-item {
          flex: 1;
          padding: 24rpx;
          margin-right: 20rpx;
          border-radius: 5px;
          height: 170rpx;
          background-size: 100% 100%;
          .flex-column(@JC: space-between);
          .content-patrol-main-item-title {
            font-size: 28rpx;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
          .content-patrol-main-item-rate {
            flex: 1;
            font-size: 24rpx;
            line-height: 60rpx;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
          .content-patrol-main-item-start {
            font-size: 20rpx;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
          .content-patrol-main-item-end {
            font-size: 20rpx;
            line-height: 30rpx;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .content-problem {
      padding: 0 20rpx;
      background: white;
      .content-problem-main {
        .content-problem-main-item {
          flex: 1;
          padding: 24rpx 0;
          border-radius: 5px;
          background-size: 100% 100%;
          border-bottom: 2rpx solid rgba(244, 244, 244, 1);
          .content-problem-main-item-top {
            font-size: 28rpx;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
          .content-problem-main-item-bottom {
            .flex-row(flex-end,
              space-between);
            .content-problem-main-item-bottom-address {
              font-size: 24rpx;
              font-weight: 500;
              color: rgba(153, 153, 153, 1);
            }
            .content-problem-main-item-bottom-date {
              font-size: 32rpx;
              font-weight: 500;
              color: rgba(29, 129, 222, 1);
            }
          }
        }
      }
    }
    .content-news {
      padding: 0 20rpx;
      background: white;
      .content-news-main {
        .content-news-main-item {
          margin-bottom: 20rpx;
          .flex-row();
          .content-news-main-item-left {
            width: 140rpx;
            height: 140rpx;
            img {
              width: 140rpx;
              height: 140rpx;
              border-radius: 5rpx;
            }
          }
          .content-news-main-item-right {
            padding: 0 20rpx;
            .content-news-main-item-right-title {
              font-size: 30rpx;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
              line-height: 42rpx;
            }
            .content-news-main-item-right-info {
              font-size: 24rpx;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 40rpx;
            }
          }
        }
      }
    }
  }
</style>
