<template>
  <div class="content">
    <div class="content-charts">
      <div class="content-charts-title">实时报警统计</div>
      <canvas class="content-charts-main" id="charts" height="410" width="750" />
      <div class="content-charts-times">
        <div class="content-charts-times-item" v-for="item in 7">
          {{pageConfig.currentHour - 7 + item + ':00'}}
        </div>
      </div>
    </div>
    <div class="content-marquee">
      <img src="/static/images/town/voice_red_icon.png">
      <swiper class="content-banner-swiper" style="height:30rpx" previousMargin="10px" nextMargin="10px" circular autoplay>
        <template v-for="(item, index) in pageData.alertList">
          <swiper-item class="content-banner-swiper-item">
            <div @click="handleTownAlertItemClick(item.whole)">火警通知：{{item.time}} {{item.address}}发生火灾报警</div>
          </swiper-item>
        </template>
      </swiper>
    </div>
    <div class="content-score">
      <div class="content-X-title">
        综合指数
      </div>
      <div class="content-score-main">
        <div class="content-score-main-top">
          <div class="content-score-main-top-1" @click="handleGeneralItemClick(pageData.scoreList[0])">
            <div class="content-score-main-top-X-logo">
              <img src="/static/images/town/bono_1_icon.png">
            </div>
            <div class="content-score-main-top-X-name">{{pageData.scoreList[0].name}}</div>
            <div class="content-score-main-top-X-score">{{pageData.scoreList[0].score}}分</div>
          </div>
          <div class="content-score-main-top-2" @click="handleGeneralItemClick(pageData.scoreList[1])">
            <div class="content-score-main-top-X-logo">
              <img src="/static/images/town/bono_2_icon.png">
            </div>
            <div class="content-score-main-top-X-name">{{pageData.scoreList[1].name}}</div>
            <div class="content-score-main-top-X-score">{{pageData.scoreList[1].score}}分</div>
          </div>
          <div class="content-score-main-top-3" @click="handleGeneralItemClick(pageData.scoreList[2])">
            <div class="content-score-main-top-X-logo">
              <img src="/static/images/town/bono_3_icon.png">
            </div>
            <div class="content-score-main-top-X-name">{{pageData.scoreList[2].name}}</div>
            <div class="content-score-main-top-X-score">{{pageData.scoreList[2].score}}分</div>
          </div>
        </div>
        <div class="content-score-main-list" >
          <div class="content-score-main-list-item" v-for="item in pageData.afterScoreList">
            <score-card :config="item"></score-card>
          </div>
        </div>
      </div>
    </div>
    <div class="content-exam">
      <div class="content-X-title">
        消防考试
      </div>
      <div class="content-exam-main" @click="handleExamClick">
        <div class="content-exam-main-left">
          <div class="content-exam-main-left-title">消防知识培训</div>
          <div class="content-exam-main-left-mark">消防安全，人人有责</div>
          <div class="content-exam-main-left-btn">
            <img src="/static/images/home/comment_btn_icon.png">
          </div>
        </div>
        <div class="content-exam-main-right">
          <div class="content-exam-main-right-img">
            <img src="/static/images/town/exam_right_img.png">
          </div>
        </div>
      </div>
    </div>
    <div class="content-news">
      <div class="content-X-title">
        园区新闻
      </div>
      <div class="content-news-main">
        <div class="content-news-main-item" v-for="item in pageData.newsList" @click="handleNewsItemClick">
          <news-card :config="item"></news-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import scoreCard from '@/components/scoreCard'
  import newsCard from '@/components/newsCard'
  export default {
    name: 'Town',
    data () {
      return {
        pageConfig: {
          windowWidth: 610,
          currentHour: 15,
          currentWeekDay: '',
          currentTime: ''
        },
        pageData: {
          scoreList: [{name: '', score: ''}, {name: '', score: ''}, {name: '', score: ''}],
          newsList: [],
          afterScoreList: [],
          alertList: []
        }
      }
    },
    components: {
      scoreCard,
      newsCard
    },
    computed: {},
    methods: {
      async handleFlashPage () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        const yAxis = (await this.$request('/fireAnalysis/getFireCountByTimes', 'GET')).data.data.data
        this.bezierLine('charts', {
          xAxis: [1, 2, 3, 4, 5, 6, 7],
          yAxis: yAxis
        })
        try{
          this.pageData.alertList = (await this.$request('/fireWarn/list', 'GET', {
          pageNo: 1,
          pageSize: 3,
          status: 2
        })).data.data.rows.map(item => ({
          address: item.address,
          time: this.$moment(item.gmtCreate).format('YYYY-MM-DD h:mm'),
          whole: item
        }))
        
        this.pageData.newsList = (await this.$request('/newsList', 'GET', {
          userId: userInfo.id,
          page: 1,
          limit: 4
        })).data.data.list.map(item => ({
          title: item.title,
          author: item.author,
          img: 'http://118.31.247.145:8088/getPicture?picture=' + item.titleImg,
          date: this.$moment(item.createTime).format('YYYY-MM-DD h:mm'),
          whole: item
        }))

        const townList = (await this.$request('/area/regions', 'GET', {
        })).data.data

        let townObj = {}

        for (let i = 0; i < townList.length; i++) {
          townObj[townList[i].areaName] = townList[i].areaId
        }

        this.pageData.scoreList = (await this.$request('/screen/multipleAnalysis/getData', 'GET', {
          type: 'multiple'
        })).data.data.chartList.map(item => ({
          score: item.score,
          name: item.address,
          id: townObj[item.address]
        }))
        this.pageData.scoreList.sort(this.sortData)

        this.pageData.scoreList.forEach((item, index) => {
          item.no = (index + 1)
        })
        this.pageData.afterScoreList = this.pageData.scoreList.slice(3, this.pageData.scoreList.length)
        const mydate = new Date()
        const myddy = mydate.getDay()
        const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        this.pageConfig.currentWeekDay = weekday[myddy]
        this.pageConfig.currentTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        this.pageConfig.currentHour = mydate.getHours()
        this.$forceUpdate()
        }catch(err){
          console.log('err==>', err)

        }
        
      },
      sortData (a, b) {
        return Number(b.score) - Number(a.score)
      },
      bezierLine (canvasId, options) {
        mpvue.getSystemInfo({
          success: result => {
            this.pageConfig.windowWidth = result.windowWidth
            this.$forceUpdate()
            const ctx = mpvue.createCanvasContext(canvasId)
            let a = 750 / 6
            // dep => console.log('宽度', a)
            let data = []
            options.xAxis.map((item, i) => {
              data.push([i * a, 400 - options.yAxis[i]])
              ctx.setLineWidth(1)
              ctx.moveTo(i * a, 0)
              ctx.lineTo(i * a, 400)
              ctx.setStrokeStyle('#65E1FF')
              ctx.stroke()
              // 最后一个点显示数值
              if (options.xAxis.length === (i + 1)) {
                ctx.setFontSize(24)
                ctx.setFillStyle('rgba(255,255,255,1)')
                ctx.setTextAlign('right')
                ctx.fillText(options.yAxis[i], i * a, 380 - options.yAxis[i])
              }
            })
            data.unshift(data[0])
            data.push(data[data.length - 1])

            ctx.beginPath()
            data.map((item, i) => {
              const a = 0.25
              const b = 0.25
              if (i === 0 || i === data.length - 1) {
                // do nothing
              } else if (i === 1) {
                ctx.moveTo(item[0], item[1])
                //
              } else {
                const a1 = data[i - 1][0] + a * (data[i][0] - data[i - 2][0])
                const a2 = data[i - 1][1] + b * (data[i][1] - data[i - 2][1])
                const b1 = data[i][0] - b * (data[i + 1][0] - data[i - 1][0])
                const b2 = data[i][1] - b * (data[i + 1][1] - data[i - 1][1])
                ctx.bezierCurveTo(a1, a2, b1, b2, item[0], item[1])
              }
            })
            ctx.setLineWidth(5)
            ctx.setStrokeStyle('#65E1FF')
            ctx.stroke()

            ctx.draw()
          }
        })
      },
      handleAlertClick (item) {
        // dep => console.log('fuck')
        const url = `../townAlert/main?item=${JSON.stringify(item)}`
        mpvue.navigateTo({
          url
        })
      },
      handleNewsItemClick () {
        mpvue.navigateTo({
          url: '../homeNews/main'
        })
      },
      handleExamClick () {
        mpvue.navigateTo({
          url: '../homeExam/main'
        })
      },
      handleGeneralItemClick (item) {
        mpvue.navigateTo({
          url: `../townGeneral/main?item=${JSON.stringify(item)}`
        })
      }
    },
    mounted () {
      // this.pageData.scoreList.forEach((item, index) => {
      //   item.no = (index + 4)
      // })
      this.pageData = JSON.parse(JSON.stringify(this.pageData))
    },
    onShow () {
      this.handleFlashPage()
    },
    created () {
      this.handleFlashPage()
    },
    async onPullDownRefresh () {
      await this.handleFlashPage()
      mpvue.stopPullDownRefresh()
      mpvue.showToast({
        type: 'success',
        content: '刷新成功',
        duration: 2000,
        success: () => {
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .content-charts {
      background-image: linear-gradient(0deg, @color-main 0%, rgba(17, 198, 225, 1) 100%);
      .flex-column(center);
      .content-charts-title {
        padding-bottom: 20rpx;
        .font-medium-bold();
        color: white;
        line-height: 48rpx;
      }
      .content-charts-main {
        width: 86%;
        height: 400rpx;
      }
      .content-charts-times {
        .flex-row();
        width: 100%;
        .content-charts-times-item {
          flex: 1;
          text-align: center;
          .font-medium-bold();
          color: white;
          line-height: 48rpx;
          opacity: 0.7;
        }
      }
    }
    .content-marquee {
      .flex-row(center);
      padding: 14rpx;
      .font-medium-bold();
      background: #FFFFCC;
      color: @color-text-main;
      img {
        margin-right: 10rpx;
        width: 43rpx;
        height: 43rpx;
      }
    }
    .content-X-title {
      padding-bottom: 14rpx;
      .font-huge-bold();
      color: @color-text-main;
      .border-bottom();
    }
    .content-score {
      padding: 40rpx 19rpx;
      .content-score-main {
        padding: 30rpx 0;
        .content-score-main-top {
          .flex-row(@JC: space-between);
          .content-score-main-top-X-logo {
            img {
              height: 130rpx;
              width: 95rpx;
            }
          }
          .content-score-main-top-X-name {
            padding: 18rpx 0;
            .font-large-bold();
            color: @color-text-main;
          }
          .content-score-main-top-X-score {
            .font-huge-bold();
            color: @color-main;
          }
          .content-score-main-top-1 {
            .flex-column(center);
            padding: 20rpx 0;
            width: 220rpx;
            .white-background();
            .box-shadow-large();
            .border-radius-huge();
          }
          .content-score-main-top-2 {
            .flex-column(center);
            padding: 20rpx 0;
            width: 220rpx;
            .white-background();
            .box-shadow-large();
            .border-radius-huge();
          }
          .content-score-main-top-3 {
            .flex-column(center);
            padding: 20rpx 0;
            width: 220rpx;
            .white-background();
            .box-shadow-large();
            .border-radius-huge();
          }
        }
        .content-score-main-list {
          .content-score-main-list-item {
            margin-top: 20rpx;
          }
        }
      }
    }
    .content-exam {
      padding: 20rpx 19rpx;
      .content-exam-main {
        margin: 20rpx 0;
        height: 226rpx;
        background: linear-gradient(90deg, rgba(16, 181, 208, 1) 0%, rgba(96, 89, 232, 1) 100%);
        .border-radius-large();
        display: flex;
        flex-direction: row;
        align-items: center;
        .content-exam-main-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 74rpx 0 48rpx;
          .content-exam-main-left-title {
            font-size: 36rpx;
            font-weight: 500;
            color: white;
            line-height: 50rpx;
          }
          .content-exam-main-left-mark {
            font-size: 28rpx;
            color: white;
            line-height: 40rpx;
          }
          .content-exam-main-left-btn {
            padding: 20rpx 0;
            img {
              height: 30rpx;
              width: 154rpx;
            }
          }
        }
        .content-exam-main-right {
          img {
            height: 134rpx;
            width: 144rpx;
            margin-left: 100rpx;
          }
        }
      }
    }
    .content-news {
      padding: 40rpx 19rpx;
      .content-news-main {
        .content-news-main-item {
          .border-bottom();
        }
      }
    }
  }
</style>
