<template>
  <div class="content">
    <div class="content-left">
      <div class="content-left-top">{{config.title}}</div>
      <div class="content-left-bottom">
        <div class="content-left-bottom-left">{{config.author}}</div>
        <div class="content-left-bottom-right">{{config.date}}</div>
      </div>
    </div>
    <div class="content-right">
      <img :src="config.img">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    }
  }
</script>

<style lang="less" scoped>
  .content {
    padding: 24rpx 0;
    .flex-row(center);
    .content-left {
      .flex-column();
      flex: 1;
      .content-left-top {
        margin-bottom: 33rpx;
        font-size: 28rpx;
        font-weight: 600;
        color: @color-text-main;
      }
      .content-left-bottom {
        .flex-row();
        .content-left-bottom-left {
          flex: 3;
          font-size: 28rpx;
          color: @color-text-main;
        }
        .content-left-bottom-right {
          flex: 7;
          font-size: 28rpx;
          color: @color-text-main;
          opacity: 0.58;
        }
      }
    }
    .content-right {
      width: 122rpx;
      height: 122rpx;
      .border-radius-large();
      img {
        width: 122rpx;
        height: 122rpx;
      }
    }
  }
</style>
