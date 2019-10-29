<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-bar">
        <div class="content-top-bar-item" v-for="item in pageConfig.tabList" :key="item.title" @click="handleTabClick(item.url)">
          <div class="content-top-bar-item-icon">
            <img :src="item.icon" :style="item.style">
          </div>
          <div class="content-top-bar-item-title">
            {{item.title}}<br><div class="content-top-bar-item-desc">{{item.desc}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-patrol">
      <div class="content-X-title">
        维保任务
      </div>
      <div class="content-patrol-main">
        <div class="content-patrol-main-item" v-for="item in pageData.taskList" :style="{ 'background-image': 'url(' + item.back + ')' }" @click="handleMaintenanceItemClick(item)">
          <div class="content-patrol-main-item-title">
            {{item.title}}
          </div>
          <div class="content-patrol-main-item-start">
            {{item.deadLine}}
          </div>
        </div>
      </div>
    </div>
    <div class="content-problem">
      <div class="content-X-title">
        待办隐患
      </div>
      <div class="content-problem-main">
        <div class="content-problem-main-item" v-for="item in pageData.problemList" @click="handleProblemItemClick(item.whole)">
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
        <div class="content-news-main-item" v-for="item in pageData.newsList" @click="handleNewsItemClick">
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
    name: 'MaintenanceHome',
    components: {},
    data () {
      return {
        pageConfig: {
          tabList: [{
            title: '隐患',
            desc: '久患成灾',
            url: '../homeProblem/main',
            icon: '/static/images/work/kucun_tab_icon.png',
            style: {
              height: '78rpx',
              width: '66rpx'
            }
          }, {
            title: '维保',
            desc: '防患未然',
            url: '../maintenance/main',
            icon: '/static/images/work/maintenance_tab_icon.png',
            style: {
              height: '76rpx',
              width: '76rpx'
            }
          }]
        },
        pageData: {
          problemList: [],
          newsList: [{
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565186188232&di=de38831ccff6f8bfe98dba594f338420&imgtype=0&src=http%3A%2F%2Fimg2.tuicool.com%2FrABVn2N.jpg%2521web',
            title: '中大园区举行消防演练看起来好像很对事情的',
            author: '云弈物业',
            date: '2018-08-01'
          }, {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565186188232&di=de38831ccff6f8bfe98dba594f338420&imgtype=0&src=http%3A%2F%2Fimg2.tuicool.com%2FrABVn2N.jpg%2521web',
            title: '中大园区举行消防演练看起来好像很对事情的',
            author: '云弈物业',
            date: '2018-08-01'
          }, {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565186188232&di=de38831ccff6f8bfe98dba594f338420&imgtype=0&src=http%3A%2F%2Fimg2.tuicool.com%2FrABVn2N.jpg%2521web',
            title: '中大园区举行消防演练看起来好像很对事情的',
            author: '云弈物业',
            date: '2018-08-01'
          }, {
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565186188232&di=de38831ccff6f8bfe98dba594f338420&imgtype=0&src=http%3A%2F%2Fimg2.tuicool.com%2FrABVn2N.jpg%2521web',
            title: '中大园区举行消防演练看起来好像很对事情的',
            author: '云弈物业',
            date: '2018-08-01'
          }],
          taskList: []
        }
      }
    },
    methods: {
      handleTabClick (url) {
        if (url) {
          mpvue.navigateTo({
            url
          })
        }
      },
      async handleFlashPage () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        const role = mpvue.getStorageSync({key: 'role'}).data
        if (role === 'wbry') {
          this.pageData.problemList = (await this.$request('/AppWarning/AppWarning', 'GET', {
            pageNo: 1,
            pageSize: 3,
            institutionType: 1,
            userId: userInfo.id,
            workOrderStates: 1
          })).data.data.rows.map(item => ({
            title: item.hiddangerName,
            address: item.place,
            date: this.$moment().diff(this.$moment(item.reportTime), 'day') + '天',
            whole: item
          }))

          this.pageData.taskList = ((await this.$request('/appMaintenance/selectByCriteria', 'POST', {
            userId: userInfo.id,
            status: 1
          })).data.data || []).map(item => ({
            id: item.id,
            title: item.routingName,
            back: '/static/images/work/patrol_yellow_back.png',
            deadLine: new Date(parseInt(item.planFinishTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
          })).slice(0, 3)
        } else if (role === 'wbjl') {
          this.pageData.problemList = (await this.$request('/AppWarning/AppWarning', 'GET', {
            pageNo: 1,
            pageSize: 3,
            institutionType: 3,
            maintenanceId: userInfo.id,
            workOrderStates: 1
          })).data.data.rows.map(item => ({
            title: item.hiddangerName,
            address: item.place,
            date: this.$moment().diff(this.$moment(item.reportTime), 'day') + '天',
            whole: item
          }))

          this.pageData.taskList = ((await this.$request('/appMaintenance/selectByDeptId', 'POST', {
            deptId: userInfo.deptId,
            status: 1
          })).data.data || []).map(item => ({
            id: item.id,
            title: item.routingName,
            back: '/static/images/work/patrol_yellow_back.png',
            deadLine: new Date(parseInt(item.planFinishTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
          })).slice(0, 3)
        }

        this.pageData.newsList = (await this.$request('/newsList', 'GET', {
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
        this.$forceUpdate()
      },
      handleNewsItemClick () {
        mpvue.navigateTo({
          url: '../homeNews/main'
        })
      },
      handleProblemItemClick (item) {
        mpvue.navigateTo({
          url: `../homeProblemDetail/main?item=${JSON.stringify(item)}`
        })
      },
      handleMaintenanceItemClick (item) {
        mpvue.navigateTo({
          url: `../maintenanceObject/main?id=${item.id}`
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
      }
  }
</script>

<style lang="less" scoped>
  .content {
    background: rgba(241, 241, 241, 1);
    .content-top {
      background: linear-gradient(360deg, rgba(32, 128, 217, 1) 0%, rgba(29, 129, 222, 1) 100%);
      padding: 30px 20rpx;
      height: 40rpx;
      margin-bottom: 85rpx;
      .content-top-bar {
        z-index: 9;
        padding: 50rpx 20rpx;
        .flex-row(center, space-around);
        .content-top-bar-item {
          border-radius: 5px;
          background: white;
          align-items: center;
          height: 120rpx;
          width: 40%;
          .flex-row(center, center);
          .content-top-bar-item-title {
            font-size: 28rpx;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            .content-top-bar-item-desc {
              font-size: 20rpx;
              color: #bcbcbc;
            }
          }
        }
      }
    }
    .content-X-title {
      padding: 20rpx 0;
      .font-huge-bold();
      color: @color-text-main;
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
