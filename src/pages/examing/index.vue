<template>
  <div class="content">
    <div class="content-top">单项选择题<span style="float:right;margin-top:-5rpx;"><span style="color:#127ad4;">{{currentQuestionIndex}}</span>/{{examData.questionCount}}</span></div>
    <div class="content-question" >{{currentQuestionIndex}}、{{examData.questionList[currentQuestionIndex-1].title}}</div>
    <div class="content-answer" :style="{ color: answerList[currentQuestionIndex-1] === 'A' ? '#127ad4' : '' }" @click="handleSelect('A')">A.{{examData.questionList[currentQuestionIndex-1].optionA}}</div>
    <div class="content-answer" :style="{ color: answerList[currentQuestionIndex-1] === 'B' ? '#127ad4' : '' }" @click="handleSelect('B')">B.{{examData.questionList[currentQuestionIndex-1].optionB}}</div>
    <div class="content-answer" :style="{ color: answerList[currentQuestionIndex-1] === 'C' ? '#127ad4' : '' }" @click="handleSelect('C')">C.{{examData.questionList[currentQuestionIndex-1].optionC}}</div>
    <div class="content-answer" :style="{ color: answerList[currentQuestionIndex-1] === 'D' ? '#127ad4' : '' }" @click="handleSelect('D')">D.{{examData.questionList[currentQuestionIndex-1].optionD}}</div>
    <div class="content-operate">
      <div v-show="currentQuestionIndex>1" @click="handlePre">上一题</div>
      <div v-show="currentQuestionIndex<examData.questionCount" style="margin-left:100rpx;" @click="handleNext">下一题</div>
      <div v-show="currentQuestionIndex===examData.questionCount" style="margin-left:100rpx;" @click="handleSubmit">交卷</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        examId: '',
        answerList: ['', '', '', '', '', '', '', '', '', ''],
        currentQuestionIndex: 1,
        examData: {
          questionCount: 10,
          questionList: [
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题1'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题2'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题3'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题4'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题5'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题6'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题7'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题8'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题9'
            },
            {
              answer: 'A',
              examId: 0,
              id: 0,
              optionA: '回答1',
              optionB: '回答2',
              optionC: '回答3',
              optionD: '回答4',
              title: '问题10'
            }
          ]
        }
      }
    },
    components: {
    },
    computed: {},
    onLoad (option) {
      this.examId = option.examId
      this.handleFlashPage()
    },
    methods: {
      handleSelect (answer) {
        this.answerList[this.currentQuestionIndex - 1] = answer
        this.$forceUpdate()
      },
      handlePre () {
        this.currentQuestionIndex = this.currentQuestionIndex - 1
      },
      handleNext () {
        this.currentQuestionIndex = this.currentQuestionIndex + 1
      },
     async handleSubmit () {
       const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
       mpvue.httpRequest({
         headers: {
           'Content-Type': 'application/json'
         },
         url: 'http://120.55.234.38/api/userExam/hand?userId=' + userInfo.id,
         method: 'POST',
         // 需要手动调用JSON.stringify将数据进行序列化
         data: JSON.stringify({
           answerList: this.answerList, examId: this.examId
         }),
         dataType: 'json',
         success: function (res) {
           const resData = res.data
           if (resData.code === 200) {
             mpvue.showToast({
               type: 'success',
               content: '交卷成功',
               duration: 2000,
               success: () => {
                 mpvue.switchTab({url: '../homeAuth/main'})
               }
             })
           }
       },
         fail: function (res) {
           // mpvue.alert({content: 'fail'})
       },
         complete: function (res) {
           // mpvue.alert({content: 'complete'})
       }
       })
    },
      async handleFlashPage () {
        this.examData.questionList = (await this.$request('/question', 'GET', {
          examId: this.examId
        })).data.data
        this.examData.questionCount = this.examData.questionList.length
        this.answerList = new Array(this.examData.questionCount)
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="less" scoped>

  .content {
    .content-top{
      height:42rpx;
      background-color: #f0f0f0;
      font-size: 22rpx;
      padding-left: 10rpx;
      padding-top: 20rpx;
    }
    .content-question{
      margin-top: 20rpx;
      font-size: 26rpx;
      padding-left: 10rpx;
    }

    .content-answer{
      margin-top: 20rpx;
      font-size: 26rpx;
      padding-left: 10rpx;
    }

    .content-operate{
      margin-top: 700rpx;
      font-size: 26rpx;
      padding-left: 10rpx;
      .flex-row(center,center)
    }

    .content-operate{
      margin-top: 700rpx;
      font-size: 26rpx;
      padding-left: 10rpx;
      .flex-row(center,center)
    }
  }
</style>
