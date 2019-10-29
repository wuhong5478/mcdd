<template>
  <div class="content">
    <div class="content-news-main">
      <div class="content-news-main-item" v-for="item in pageData.newsList">
        <home-news-card :config="item"></home-news-card>
      </div>
    </div>
  </div>
</template>

<script>
  import homeNewsCard from '@/components/homeNewsCard'
  export default {
    components: {homeNewsCard},
    data () {
      return {
        pageData: {
          newsList: []
        }
      }
    },
    async onShow () {
    },
    onLoad () {
      this.handleFlashPage()
    },
    methods: {
      async handleFlashPage () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        this.pageData.newsList = (await this.$request('/newsList', 'GET', {
          userId: userInfo.id,
          page: 1,
          limit: 50
        })).data.data.list.map(item => ({
          title: item.title,
          author: item.author,
          img: 'http://118.31.247.145:8088/getPicture?picture=' + item.titleImg,
          date: this.$moment(item.createTime).format('YYYY-MM-DD'),
          whole: item
        }))
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    background: rgba(241, 241, 241, 1);
      .content-news-main {
        .content-news-main-item {
          padding-top: 10rpx;
          .border-bottom();
        }
      }
  }

</style>
