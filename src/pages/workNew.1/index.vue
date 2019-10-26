<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-bar">
        <div class="content-top-bar-item" v-for="item in pageConfig.tabList" :key="item.title">
          <div class="content-top-bar-item-icon">
            <img :src="item.icon" :style="item.style">
          </div>
          <div class="content-top-bar-item-title">
            {{item.title}}
          </div>
        </div>
      </div>
    </div>
    <div class="content-notic">
      <div class="content-notic-content">
        <div class="content-notic-content-icon">
          <img src="/static/images/work/notic_blue_icon.png">
        </div>
        <div class="content-notic-content-title">
          最新公告
        </div>
        <div class="content-notic-content-main">
          中大园区进行消防演练通知
        </div>
        <div class="content-notic-content-more">
          <img src="/static/images/work/more_gray_icon.png">
        </div>
      </div>
    </div>
    <div class="content-mission">
      <div class="content-X-title">
        火警任务
      </div>
      <div class="content-mission-main">
        <div class="content-mission-main-item" v-for="item in pageData.missionList">
          <div class="content-mission-main-item-top">
            <div class="content-mission-main-item-top-title">{{item.title}}</div>
            <div class="content-mission-main-item-top-time">{{item.time}}</div>
          </div>
          <div class="content-mission-main-item-bottom">
            <div class="content-mission-main-item-bottom-address">
              {{item.address}}</div>
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
        <div class="content-patrol-main-item" v-for="item in pageData.patrolList" :style="{ 'background-image': 'url(' + item.back + ')' }">
          <div class="content-patrol-main-item-title">
            {{item.title}}
          </div>
          <div class="content-patrol-main-item-rate">
            {{item.rate}}
          </div>
          <div class="content-patrol-main-item-start">
            {{item.start}}
          </div>
          <div class="content-patrol-main-item-end">
            - {{item.end}}
          </div>
        </div>
      </div>
    </div>
    <div class="content-problem">
      <div class="content-X-title">
        待办隐患
      </div>
      <div class="content-problem-main">
        <div class="content-problem-main-item" v-for="item in pageData.problemList">
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
        <div class="content-news-main-item" v-for="item in pageData.newsList">
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
    components: {},
  
    data () {
      return {
        pageConfig: {
          tabList: [{
            title: '火警',
            icon: '/static/images/work/xiaofang_tab_icon.png',
            style: {
              height: '82rpx',
              width: '68rpx'
            }
          }, {
            title: '隐患',
            icon: '/static/images/work/kucun_tab_icon.png',
            style: {
              height: '78rpx',
              width: '66rpx'
            }
          }, {
            title: '巡查',
            icon: '/static/images/work/sousuo_tab_icon.png',
            style: {
              height: '70rpx',
              width: '88rpx'
            }
          }, {
            title: '学习',
            icon: '/static/images/work/fenlei_tab_icon.png',
            style: {
              height: '76rpx',
              width: '76rpx'
            }
          }]
        },
        pageData: {
          missionList: [{
            title: '独立式感烟他测器',
            time: '16:00',
            date: '2018-09-10',
            address: '重大产业园一号楼203室内'
          }, {
            title: '独立式感烟他测器',
            time: '16:00',
            date: '2018-09-10',
            address: '重大产业园一号楼203室内'
          }],
          patrolList: [{
            title: '每日巡检任务',
            rate: '每周一次',
            start: '2019-09-20',
            end: ' 2019-09-27',
            back: '/static/images/work/patrol_blue_back.png'
          }, {
            title: '每日巡检任务',
            rate: '每周一次',
            start: '2019-09-20',
            end: ' 2019-09-27',
            back: '/static/images/work/patrol_gray_back.png'
          }, {
            title: '每日巡检任务',
            rate: '每周一次',
            start: '2019-09-20',
            end: ' 2019-09-27',
            back: '/static/images/work/patrol_yellow_back.png'
          }],
          problemList: [{
            title: '消防通道堵塞',
            address: '中大产业园1号楼203室',
            date: '7天'
          }, {
            title: '消防通道堵塞',
            address: '中大产业园1号楼203室',
            date: '7天'
          }, {
            title: '消防通道堵塞',
            address: '中大产业园1号楼203室',
            date: '7天'
          }],
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
          }]
        }
      }
    },
    methods: {},
  
    created () {}
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
