<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-title">{{config.title}}</div>
      <div class="content-top-score" :style="{ color: statusConfig[config.status].color }" v-if="statusConfig[config.status].color">{{config.score}}</div>
    </div>
    <div class="content-info">
      <div class="content-info-date">{{config.date}}</div>
      <div class="content-info-status">{{statusConfig[config.status].text}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    },
    data () {
      return {
        statusConfig: [{
          text: '未完成',
          color: null
        }, {
          text: '已完成',
          color: 'black'
        }, {
          text: '重新考试',
          color: '#F56C6C'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    padding: 16rpx 27rpx 24rpx 27rpx;
    .border-bottom();
    .content-top {
      .flex-row(center, space-between);
      padding: 16rpx 0;
      .content-top-title {
        .font-huge-bold();
        color: @color-text-main;
        &::before {
          content: ' ';
          display: inline-block;
          height: 10rpx;
          width: 10rpx;
          margin: 8rpx 8rpx 8rpx 0;
          background: @color-main;
          .border-radius-circle();
        }
      }
      .content-top-score {
        font-size: 40rpx;
        font-weight: 500;
        color: @color-text-main;
        &::after {
          content: '分';
          .font-large-bold();
          color: @color-text-main;
        }
      }
    }
    .content-info {
      .flex-row(flex-end, space-between);
      .content-info-date {
        .font-medium-bold();
        color: @color-text-main;
        opacity: 0.58;
      }
      .content-info-status {
        .font-large();
        color: @color-text-main;
      }
    }
  }
</style>
