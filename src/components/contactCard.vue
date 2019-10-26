<template>
  <div class="content">
    <div class="content-info">{{config.info}} {{config.phone}}</div>
    <div class="content-btn">
      <img src="/static/images/contact/phone_blue_icon.png">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    },
    created () {
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .flex-row(center);
    padding: 8rpx 20rpx;
    .content-info {
      flex: 8;
      .font-medium();
    }
    .content-btn {
      margin: 0 40rpx;
      height: 50rpx;
      width: 50rpx;
      .border-radius-circle();
      text-align: center;
      background: #EBEEF5;
      img {
        height: 25rpx;
        width: 25rpx;
      }
    }
  }
</style>
