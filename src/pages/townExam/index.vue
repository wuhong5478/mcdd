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
          examList: [{
            title: '云栖小镇春季消防培训考试',
            date: '2018-04-01 12:00',
            score: null,
            status: 0
          }, {
            title: '云栖小镇夏季消防培训考试',
            date: '2018-08-02 18:00',
            score: 98,
            status: 1
          }, {
            title: '云栖小镇冬季消防培训考试',
            date: '2018-12-01 12:00',
            score: 60,
            status: 2
          }]
        }
      }
    },
    components: {
      examCard
    },
    computed: {},
    methods: {
      handleExamClick (item) {
        const url = '../examConfirm/main'
        mpvue.navigateTo({
          url
        })
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  .content {
  }
</style>
