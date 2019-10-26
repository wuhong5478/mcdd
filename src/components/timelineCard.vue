<template>
  <div class="content">
    <div class="content-time">
      {{config.time}}
    </div>
    <div class="content-line">
      <div class="content-line-point">
      </div>
      <div class="content-line-line" v-if="config.title !== '火灾结束'"></div>
    </div>
    <div class="content-detail">
      <div class="content-detail-title">{{config.title}}</div>
      <text class="content-detail-content" space="nbsp">{{config.description}}</text>
      <div class="content-detail-outline"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    },
    created () {},
    data () {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .flex-row(flex-start);
    padding: 20rpx 20rpx 0 20rpx;
    .content-time {
      flex: 3;
      .font-medium-bold();
      margin-top: 20rpx;
    }
    .content-line {
      .flex-column(center);
      flex: 2;
      margin-top: 20rpx;
      .content-line-point {
        height: 20rpx;
        width: 20rpx;
        .border-radius-circle();
        background: @color-main;
      }
      .content-line-line {
        margin-top: 20rpx;
        height: 150rpx;
        width: 2rpx;
        background: #F2F6FC;
      }
    }
    .content-detail {
      position: relative;
      overflow-y: hidden;
      flex: 9;
      padding: 20rpx 30rpx;
      .border-radius-normal();
      .box-shadow-small();
      .content-detail-title {
        padding-bottom: 15rpx;
        .font-medium-bold();
      }
      .content-detail-content {
        .font-small();
      }
      .content-detail-outline {
        position: absolute;
        left: -20rpx;
        height: 100rpx;
        width: 4rpx;
        background: rgb(181, 183, 187);
        z-index: 999;
      }
    }
  }
</style>
