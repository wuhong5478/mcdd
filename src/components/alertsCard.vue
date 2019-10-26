<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-device">{{config.device}}</div>
      <div class="content-top-status" :style="{ color: statusConfig[config.status].color }">{{statusConfig[config.status].label}}</div>
    </div>
    <div class="content-bottom">
      <div class="content-bottom-address">{{config.address}}</div>
      <div class="content-bottom-date">{{config.date}}</div>
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
      return {
        statusConfig: [{
          label: '待确认',
          color: '#999999'
        }, {
          label: '火警',
          color: '#FF6060'
        }, {
          label: '误报',
          color: '#666666'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .box-shadow-small();
    .border-radius-small();
    .padding-normal();
    background: white;
    .content-top {
      .flex-row(center, space-between);
      .font-large-bold();
      padding-bottom: 20rpx;
      .content-top-device {
        padding: 10rpx 10rpx 10rpx 0;
        .font-medium();
        color:rgba(153,153,153,1);
        &::before {
          content: '设备类型：';
          font-size: 28rpx;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
      }
      .content-top-status {
        .font-large();
        color: @color-text-normal;
      }
    }
    .content-bottom {
      .flex-row(@JC: space-between);
      .font-medium();
      .content-bottom-address {
        color: rgba(153,153,153,1);
        &::before {
          content: '设备地址：';
          font-size: 28rpx;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
      }
      .content-bottom-date {}
    }
  }
</style>
