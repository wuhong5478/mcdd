<template>
  <div class="content">
    <div class="content-nav">
      <div class="content-nav-header" @click="handleUserClick">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565240713511&di=cdddc43a56b6a50d45b0ea88f18bd602&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Fface%2Fc22c8d877fc44a3ae1857d07fe0901cff0b984c1.jpg">
      </div>
    </div>
    <div class="content-charts">
      <div class="content-charts-title">实时报警统计</div>
      <canvas class="content-charts-main" id="charts" height="410" width="750" />
      <div class="content-charts-times">
        <div class="content-charts-times-item" v-for="item in 7">
          {{pageConfig.currentHour - 7 + item + ':00'}}
        </div>
      </div>
    </div>
    <div class="content-timer">
      <div class="content-timer-time">{{pageConfig.currentTime}}</div>
      <div class="content-timer-day">{{pageConfig.currentWeekDay}}</div>
    </div>
    <div class="content-bar">
      <div class="content-bar-item">
        <div class="content-bar-item-key">超时隐患</div>
        <div class="content-bar-item-value">{{pageData.warnNum}}</div>
      </div>
      <div class="content-bar-item">
        <div class="content-bar-item-key">超时巡检</div>
        <div class="content-bar-item-value">{{pageData.patrolNum}}</div>
      </div>
      <div class="content-bar-item">
        <div class="content-bar-item-key">超时维保</div>
        <div class="content-bar-item-value">{{pageData.maintenanceNum}}</div>
      </div>
    </div>
    <div class="content-tip">
      近30天数据
    </div>
    <div class="content-device" v-if="isFetched">
      <div class="content-device-title">故障设备</div>
      <div class="content-device-main">
        <div class="content-device-main-sum">
          <div class="content-device-main-sum-key">设备总数</div>
          <div class="content-device-main-sum-value">{{getPageDataDeviceInfo.total}}</div>
        </div>
        <div class="content-device-main-chart">
          <progress-bar :total="pageData.deviceInfo.total" :finish="pageData.deviceInfo.normal" bingo="yunxi"></progress-bar>
        </div>
        <div class="content-device-main-rate">
          <div class="content-device-main-rate-normal">
            <div class="content-device-main-rate-normal-key">正常</div>
            <div class="content-device-main-rate-normal-value">{{getPageDataDeviceInfo.normal}}</div>
          </div>
          <div class="content-device-main-rate-abnormal">
            <div class="content-device-main-rate-abnormal-key">故障</div>
            <div class="content-device-main-rate-abnormal-value">{{getPageDataDeviceInfo.total - getPageDataDeviceInfo.normal}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import progressBar from '@/components/progressBar'
  import svgIcon from '@/components/svgIcon'

  export default {
    name: 'Index',
    data () {
      return {
        pageConfig: {
          windowWidth: 610,
          currentHour: 15,
          currentWeekDay: '',
          currentTime: ''
        },
        pageData: {
          deviceInfo: {
            total: 0,
            normal: 0
          },
          patrolNum: 30,
          warnNum: 30,
          maintenanceNum: 30
        },
        isFetched: false,
        total: 0,
        online: 0
      }
    },

    components: {
      progressBar,
      svgIcon
    },
    computed: {
      getPageDataDeviceInfo () {
        return this.pageData.deviceInfo
      }
    },
    methods: {

      async fetchDeviceInfo () {
        const yAxis = (await this.$request('/fireAnalysis/getFireCountByTimes', 'GET')).data.data.data
        this.bezierLine('charts', {
          xAxis: [1, 2, 3, 4, 5, 6, 7],
          yAxis: yAxis
        })
        this.pageData.deviceInfo = (await this.$request('/device/category/list', 'GET')).data.data
        this.pageData.maintenanceNum = (await this.$request('/maintenanceRoutingAnalysis/MaintentimataskByday', 'GET')).data.data
        this.pageData.warnNum = (await this.$request('/appStatistics/countOverTimeHiddenWarn', 'GET')).data.data
        this.pageData.patrolNum = (await this.$request('/deviceRountingAnalysis/timataskBydayDevice', 'GET')).data.data
        this.isFetched = true
        const mydate = new Date()
        const myddy = mydate.getDay()
        const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        this.pageConfig.currentWeekDay = weekday[myddy]
        this.pageConfig.currentTime = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        this.pageConfig.currentHour = mydate.getHours()
    },
      handleUserClick () {
        const url = '../user/main'
        mpvue.navigateTo({
          url
        })
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
      clickHandle (ev) {
        // dep => console.log('clickHandle:', ev)
        // throw {message: 'custom test'}
      }
    },

    mounted () {
      this.fetchDeviceInfo()
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    overflow: auto;
    background-image: linear-gradient(0deg, @color-main 0%, rgba(17, 198, 225, 1) 100%);
    .content-nav {
      height: 120rpx;
      .content-nav-header {
        margin: 58rpx 0 0 20rpx;
        width: 50rpx;
        height: 50rpx;
        .border-radius-circle();
        img {
          width: 50rpx;
          height: 50rpx;
        }
      }
    }
    .content-charts {
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
    .content-timer {
      .flex-column(center);
      padding: 40rpx;
      .content-timer-time {
        .font-large-bold();
        color: white;
        line-height: 48rpx;
      }
      .content-timer-day {
        .font-medium-bold();
        color: white;
        line-height: 48rpx;
        opacity: 0.8;
      }
    }
    .content-bar {
      .flex-row();
      height: 80rpx;
      .content-bar-item {
        .flex-column(center);
        flex: 1;
        .content-bar-item-key {
          .font-small();
          color: rgba(202, 235, 255, 1);
          line-height: 48rpx;
          opacity: 0.6;
        }
        .content-bar-item-value {
          font-size: 48rpx;
          font-weight: bold;
          color: rgba(0, 54s, 87, 1);
          line-height: 48rpx;
        }
      }
    }
    .content-tip {
      padding: 30rpx 20rpx 10rpx 20rpx;
      text-align: right;
      .font-small();
      color: white;
      line-height: 48rpx;
      opacity: 0.8;
    }
    .content-device {
      margin: 0 20rpx 50rpx 20rpx;
      .animation-enter();
      .white-background();
      .border-radius-large();
      .content-device-title {
        padding: 0 20rpx;
        background: rgba(238, 238, 238, 1);
        .font-small();
        color: rgba(97, 97, 97, 1);
        line-height: 48rpx;
      }
      .content-device-main {
        .content-device-main-sum {
          .flex-row();
          .content-device-main-sum-key {
            padding: 0 20rpx;
            .font-medium-bold();
            color: rgba(97, 97, 97, 1);
            line-height: 48rpx;
          }
          .content-device-main-sum-value {
            .font-medium-bold();
            color: rgba(97, 97, 97, 1);
            line-height: 48rpx;
          }
        }
        .content-device-main-rate {
          .flex-row(@JC: space-between);
          .content-device-main-rate-normal {
            .flex-row();
            .content-device-main-rate-normal-key {
              padding: 0 20rpx;
              .font-medium-bold();
              color: rgba(97, 97, 97, 1);
              line-height: 48rpx;
            }
            .content-device-main-rate-normal-value {
              .font-medium-bold();
              color: rgba(97, 97, 97, 1);
              line-height: 48rpx;
            }
          }
          .content-device-main-rate-abnormal {
            .flex-row();
            .content-device-main-rate-abnormal-key {
              .font-medium-bold();
              color: rgba(97, 97, 97, 1);
              line-height: 48rpx;
            }
            .content-device-main-rate-abnormal-value {
              padding: 0 20rpx;
              .font-medium-bold();
              color: rgba(97, 97, 97, 1);
              line-height: 48rpx;
            }
          }
        }
      }
    }
  }
</style>
