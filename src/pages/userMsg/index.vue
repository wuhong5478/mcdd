<template>
  <div class="content">
    <div class="content-msg" v-for="item in pageData.msgList" :key="item.date">
      <msg-card :config="item"></msg-card>
    </div>
  </div>
</template>

<script>
  import msgCard from '@/components/msgCard'

  export default {
    components: {
      msgCard
    },

    data () {
      return {
        pageConfig: {},
        pageData: {
          msgList: []
        }
      }
    },

    created () {},
    onLoad () {
      this.handleFlashPage()
    },
    methods: {
      async handleFlashPage () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        this.pageData.msgList = (await this.$request('/noticeList', 'GET', {
          page: 1,
          userId: userInfo.id,
          limit: 50
        })).data.data.list.map(item => ({
          content: item.title,
          img: 'http://118.31.247.145:8088/getPicture?picture=' + item.titleImg,
          date: this.$moment(item.createTime).format('YYYY-MM-DD h:mm')
        }))
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    padding: 0 60rpx;
    height: 100vh;
    overflow: auto;
    .gray-background;
  }
</style>
