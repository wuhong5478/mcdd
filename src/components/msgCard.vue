<template>
  <div class="content">
    <div class="content-date">{{config.date}}</div>
    <div class="content-main">
      <div class="content-main-img" v-if="config.img">
        <img :src="config.img" mode="widthFix">
      </div>
      <div class="content-main-text">
        {{config.content}}
      </div>
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
    .flex-column(center);
    .content-date {
      margin: 40rpx;
      padding: 10rpx;
      .border-radius-normal();
      .font-small();
      background: #cccccc;
      color: white;
    }
    .content-main {
      .white-background();
      .border-radius-normal();
      .box-shadow-large();
      .content-main-img {
        img {
          width: 100%;
        }
      }
      .content-main-text {
        padding: 30rpx;
        .font-medium();
        color: @color-text-holder;
      }
    }
  }
</style>
