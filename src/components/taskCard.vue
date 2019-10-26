<template>
  <div class="content">
    <div class="content-title">
      {{config.title}}
    </div>
    <div class="content-deadline">
      {{config.deadLine}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    },
    data () {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .content {
    margin: 24rpx;
    .padding-normal();
    .border-radius-normal();
    .white-background();
    .content-title {
      .font-large();
      color: @color-text-main;
    }
    .content-deadline {
      margin-top: 20rpx;
      .font-large();
      color: @color-text-minor;
      line-height: 28rpx;
      &::before {
        content: '截止时间：';
      }
    }
  }
</style>
