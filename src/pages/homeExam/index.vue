<template>
  <div class="content">
    <div class="content-list">
      <div class="content-list-item" v-for="(item, index) in pageData.examList" :key="index" @click="handleExamClick(item)">
        <exam-card :config="item"></exam-card>
      </div>
    </div>
  </div>
</template>

<script>
  import examCard from '@/components/examCard'

  export default {
    data () {
      return {
        pageConfig: {
        },
        pageData: {
          examList: []
        }
      }
    },
    components: {
      examCard
    },
    computed: {},
    methods: {
      handleExamClick (item) {
        if (item.status === 1) {
          return false
        }
        const url = `../examConfirm/main?item=${JSON.stringify(item.whole)}`
        mpvue.navigateTo({
          url
        })
      },
      async handleFlashPage () {
        let userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        this.pageData.examList = (await this.$request('/userExam', 'GET', {
          userId: userInfo.id,
          pageSize: 100,
          pageIndex: 1
        })).data.data.list.map(item => ({
          title: item.title,
          status: this.formatStatus(item.status),
          date: this.$moment(item.createTime).format('YYYY-MM-DD h:mm'),
          score: item.score,
          whole: item
        }))
        this.$forceUpdate()
      },
      formatStatus (status) {
        if (status == null) {
          return 0
        } else if (status === 3) {
          return 1
        } else if (status === 1) {
          return 2
        }
      }
    },
    mounted () {
    },
    onShow () {
      this.handleFlashPage()
    }
  }
</script>

<style lang="less" scoped>
  .content {
  }
</style>
