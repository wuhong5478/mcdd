<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-name">{{config.name}}</div>
    </div>
    <div class="content-bottom">
      <div class="content-bottom-address">{{config.address}}</div>
      <div class="content-bottom-type">{{typeStatus[config.type].label}}</div>
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
        typeStatus: [{
          label: '隐患任务'
        }, {
          label: '巡检任务'
        }, {
          label: '火警任务'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    background: white;
    .border-radius-small();
    .padding-normal();
    .content-top {
      .flex-row(center);
      .font-large-bold();
      .content-top-name {
        padding: 10rpx 10rpx 10rpx 0;
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 34rpx;
        &::before {
          content: '任务名称：';
          font-size: 28rpx;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 40rpx;
        }
      }
    }
    .content-bottom {
      .flex-row(@JC: space-between);
      .font-medium();
      .content-bottom-address {
        color: @color-text-normal;
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 34rpx;
        &::before {
          content: '任务地址：';
          font-size: 28rpx;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 40rpx;
        }
      }
      .content-bottom-type {
        font-size: 24rpx;
        font-weight: 400;
        color: rgba(29, 129, 222, 1);
      }
    }
  }
</style>
