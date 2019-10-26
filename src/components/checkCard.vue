<template>
  <div class="content">
    <div class="content-title">
      {{config.title}}
    </div>
    <div class="content-address">
      {{config.address}}
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
      &::before {
        content: '对象名称';
        font-weight: 500;
      }
    }
    .content-address {
      .font-large();
      color: @color-text-minor;
      line-height: 28rpx;
      &::before {
        content: ' ';
        display: inline-block;
        margin-top: 20rpx;
        margin-right: 10rpx;
        height: 28rpx;
        width: 28rpx;
        background-image: url('/static/images/workCheck/location_gray_icon.png');
        background-size:100% 100%;
      }
    }
  }
</style>
