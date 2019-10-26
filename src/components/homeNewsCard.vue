<template>
  <div class="content" @click="handleNewsItemClick(config)">
      <img :src="config.img">
    <div class="content-title">{{config.title}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    },
    methods: {
      handleNewsItemClick (item) {
        mpvue.navigateTo({
          url: `../newsDetail/main?item=${JSON.stringify(item.whole)}`
          // url: '../pdfViewer/main'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .flex-column(left);
    margin: 20rpx;
    .border-radius-large();
    background-color: white;
    img {
      width: 100vw;
      height: 400rpx;
    }
    .content-title{
      margin: 20rpx;
    }

  }
</style>
