<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-name">{{config.name}}</div>
      <div class="content-top-role">{{config.role}}</div>
    </div>
    <div class="content-bottom">
      <div class="content-bottom-company">{{config.company}}</div>
      <div class="content-bottom-status" :style="{ color: noticStatus[config.status].color }">{{noticStatus[config.status].label}}</div>
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
        noticStatus: [{
          label: '· 消息未读',
          color: '#F56C6C'
        }, {
          label: '· 消息已读',
          color: '@color-main'
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
    .content-top {
      .flex-row(center);
      .font-large-bold();
      .content-top-name {
        padding: 10rpx 10rpx 10rpx 0;
        .font-large-bold();
      }
      .content-top-role {
        .font-medium();
        color: @color-text-normal;
      }
    }
    .content-bottom {
      .flex-row(@JC: space-between);
      .font-medium();
      .content-bottom-company {
        color: @color-text-normal;
      }
      .content-bottom-status {
      }
    }
  }
</style>
