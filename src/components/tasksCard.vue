<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-name">{{config.taskName}}</div>

    </div>
    <div class="content-bottom">
      <div class="content-bottom-address">{{config.taskAddress}}</div>
      <div class="content-bottom-type">{{config.taskType}}</div>
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
    .box-shadow-small();
    .border-radius-large();
    .padding-normal();
    background: white;
    .content-top {
      .flex-row(center, space-between);
      .font-large-bold();
      padding-bottom: 20rpx;
      .content-top-name {
        padding: 10rpx 10rpx 10rpx 0;
        .font-medium();
        color:rgba(153,153,153,1);
        &::before {
          content: '任务名称：';
          font-size: 28rpx;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
      }

    }
    .content-bottom {
      .flex-row(@JC: space-between);
      .font-medium();
      .content-bottom-address {
        color: rgba(153,153,153,1);
        &::before {
          content: '任务地址：';
          font-size: 28rpx;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
      }
      .content-bottom-type {
        color: rgba(29, 129, 222, 1);
      }
    }
  }
</style>
