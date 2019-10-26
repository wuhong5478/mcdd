<template>
  <div class="content">
  <div class="content-title">{{pageData.news.title}}</div>
    <div class="content-date">{{pageData.news.date}}</div>
    <div class="content-info">
      <mpParse :content="pageData.html" />
    </div>
  </div>
</template>

<script>
  import mpParse from 'mpvue-mpparse'
  export default {
    components: {mpParse},
    data () {
      return {
        pageData: {
          html: '',
          news: {}
        }
      }
    },
    onLoad (options) {
      const news = JSON.parse(options.item)
      news.date = this.$moment(news.createTime).format('YYYY-MM-DD')
      this.pageData.news = news
      this.$set(this.pageData, 'html', news.contentText)
      this.$forceUpdate()
    },
    created () {},
    methods: {
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .flex-column(center);
    margin: 20rpx;
    background-color: white;
    position: relative;
    .content-title{
      margin: 30rpx;
    }

    .content-date{
      float: right;
      font-size:22rpx;
      color: @color-text-main;
      margin-top:70rpx;
      position:absolute;
      right:0px;
    }
    .content-info{
      margin-top: 10rpx;
      margin-right: -20rpx;
    }
  }
</style>
