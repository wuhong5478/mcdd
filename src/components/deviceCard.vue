<template>
  <div class="content">
    <div class="content-name">
      {{config.categoryName}}
    </div>
    <div class="content-main">
      <div class="content-main-address">{{config.address}}</div>
      <div class="content-main-status" :style="{ color: statusConfig[config.status].color }">{{statusConfig[config.status].label}}</div>
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
          label: '· 离线',
          color: '#F56C6C'
        }, {
          label: '· 在线',
          color: '#67C23A'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    margin: 24rpx;
    .padding-normal();
    .border-radius-normal();
    .white-background();
    .content-name {
      .font-large();
      color: @color-text-main;
      padding-bottom: 20rpx;
      &::before {
        content: '设备名称：';
        font-weight: 500;
      }
    }
    .content-main {
      .flex-row(center, space-between);
      .content-main-address {
        .font-large();
        color: @color-text-minor;
        line-height: 28rpx;
        &::before {
          content: '设备安装位置：';
          font-weight: 500;
        }
      }
      .content-main-status {
        .font-medium();
      }
    }
  }
</style>
