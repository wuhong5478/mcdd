<template>
  <div class="content">
    <common-list :listData="pageData.ruleData"></common-list>
  </div>
</template>

<script>
  import commonList from '@/components/commonList'
  
  export default {
    data () {
      return {
        pageConfig: {
        },
        pageData: {
          ruleData: {
            '单项选择题 1/20': [{
              type: 'TEXT_PLAIN',
              text: '1.题目题目题目题目题题目题目题目题目题目题目题目题目()'
            }, {
              type: 'BUTTON_ANSWER',
              text: '您已确定阅读完材料并开始考试',
              data: true
            }, {
              type: 'BUTTON_ANSWER',
              text: '您已确定阅读完材料并开始考试',
              data: false
            }, {
              type: 'BUTTON_ANSWER',
              text: '您已确定阅读完材料并开始考试',
              data: false
            }]
          }
        }
      }
    },
    components: {
      commonList
    },
    computed: {},
    methods: {
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    overflow: auto;
    .gray-background;
  }
</style>
