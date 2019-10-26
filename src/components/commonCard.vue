<template>
  <div class="content" :style="{ background: config.color }">
    <div class="content-left">
      <div class="content-left-title">{{config.title}}</div>
      <div class="content-left-content">{{config.content}}</div>
      <div class="content-left-chinese">{{config.chinese}}</div>
    </div>
    <div class="content-right">
      <img :src="config.img" mode="widthFix">
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
    height: 189rpx;
    padding: 0 16rpx;
    margin: 0 19rpx;
    .border-radius-large();
    .flex-row(center);
    .content-left {
      .flex-column();
      div {
        white-space: nowrap;
      }
      .content-left-title {
        .font-large-bold();
        color: white;
      }
      .content-left-content {
        .font-medium-bold();
        color: white;
      }
      .content-left-chinese {
        .font-large-bold();
        color: white;
      }
    }
    .content-right {
      padding: 0 18rpx;
      img {
        width: 150rpx;
      }
    }
  }
</style>
