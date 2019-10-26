<template>
  <div class="content">
    <div class="content-info">
      {{examData.content}}
    </div>
    <button class="confirm-btn" @click="confirm">您已确定阅读完材料并开始考试</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        examId: '',
        examData: {
          content: '考试材料考试材料考试材料考试材料考试材料考试材料考试材料考试材考试材料考试材料料考试材料考试材料考试材料考试材料考试材料考试材料考试材料考试材料考试材料考试材料'
        }
      }
    },
    components: {
    },
    computed: {},
    onShow () {
    },
    onLoad (option) {
      const item = JSON.parse(option.item)
      this.examId = item.examId
    },
    methods: {
      confirm () {
        let url = '../examing/main?examId=' + this.examId
        mpvue.navigateTo({
          url
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .content {
    padding-top:50rpx;
    align-items: center;
    .content-info{
      padding:10rpx;
      font-size: 30rpx;
      font-weight: bold;
    }

    .confirm-btn {
      width: 100%;
      font-size: 16px;
      color: white;
      background: #1380e1;
      filter: brightness(1.4);
      margin-top: 100rpx;
    }
  }
</style>
