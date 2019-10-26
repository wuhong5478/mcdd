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
            'no-title': [{
              type: 'TEXT_PLAIN',
              text: '题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目题目'
            }],
            '  ': [{
              type: 'BUTTON_PLAIN',
              text: '您已确定阅读完材料并开始考试',
              callBack: this.handleStartClick
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
