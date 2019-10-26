<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-main">
        <div class="content-top-main-item">
        <div class="content-top-main-item-title">园区得分</div>
        <div class="content-top-main-item-mark"><span style="font-size:40rpx;"> {{scoreData['园区得分']}}</span>分</div>
        <div class="content-top-main-item-desc">火警数量周环比</div>
        <div class="content-top-main-item-number">{{warnData['火警数量周环比']}}</div>
      </div>
        <div class="content-top-main-item">

          <div class="content-top-main-item-desc2">隐患数量周环比</div>
          <div class="content-top-main-item-number2">{{warnData['隐患数量周环比']}}</div>
        </div>
        <div class="content-top-main-item">
          <div class="content-top-main-item-title">{{areaItem.name}}</div>
          <div class="content-top-main-item-desc3">&nbsp;&nbsp;设备完好率&nbsp;&nbsp;</div>
          <div class="content-top-main-item-number3">{{deviceHealthData.per}}</div>
        </div>

      </div>
    </div>
    <div class="content-patrol">
      <div class="content-patrol-main">
        <div class="content-partrol-main-item">
          <div class="content-patrol-main-item-mark">巡检任务</div>
          <div  style="font-size:40rpx;color: #67C23A;margin-top:20rpx;">{{maintenanceData['巡检任务完成率']}}%<span style="float:right;color: black;font-size:22rpx;margin-top:10rpx;">{{maintenanceData['巡检单位数量']}}</span></div>
          <div  style="color: #c7c7c7;font-size:22rpx;margin-top:20rpx;">完成率<span style="float:right;color: black;margin-top:-8rpx;">单位数量</span></div>
      </div>
        <div class="content-partrol-main-item" style="margin-left:10rpx;">
          <div class="content-patrol-main-item-mark" >维保任务</div>
          <div  style="font-size:40rpx;color: #67C23A;margin-top:20rpx;">{{maintenanceData['维保任务完成率']}}%<span style="float:right;color: black;font-size:22rpx;margin-top:10rpx;">{{maintenanceData['维保单位数量']}}</span></div>
          <div  style="color: #c7c7c7;font-size:22rpx;margin-top:20rpx;">完成率<span style="float:right;color: black;margin-top:-8rpx;">单位数量</span></div>
        </div>
    </div>
    </div>
    <div class="content-X-title">
      报警响应
    </div>

    <div class="alarm-top">
    <div class="alarm-top-main">
      <div class="alarm-top-main-item" style="width: 30%;">
        <div class="alarm-top-main-item-title">{{fireData['60s触达率']}}%</div>
        <div class="alarm-top-main-item-mark" style="margin-top:10rpx;">本月实时数据</div>
        <div class="alarm-top-main-item-title" style="margin-top:30rpx;">{{fireData['三分钟到场率']}}%</div>
        <div class="alarm-top-main-item-mark" style="margin-top:10rpx;">本月实时数据</div>
      </div>
      <div class="alarm-top-main-item" style="width: 70%;">
        <div class="alarm-top-main-item-title" style="color: black;font-size:28rpx;font-weight:400;">60s触达率</div>
        <div class="alarm-top-main-item-mark" style="margin-top:16rpx;">确保信息最短时间到达工作人员处</div>
        <div class="alarm-top-main-item-title" style="margin-top:34rpx;color: black;font-size:28rpx;font-weight:400;">3分钟到场率</div>
        <div class="alarm-top-main-item-mark" style="margin-top:16rpx;">通知相关人员后快速到达现场</div>
      </div>
    </div>
  </div>

    <div class="content-X-title">
      隐患处理
    </div>

    <div class="alarm-top">
      <div class="alarm-top-main">
        <div class="alarm-top-main-item" style="width: 30%;">
          <div class="alarm-top-main-item-title" style="color:#78de6e;">{{fireData['隐患处置率']}}%</div>
          <div class="alarm-top-main-item-mark" style="margin-top:10rpx;">本月实时数据</div>
          <div class="alarm-top-main-item-title" style="margin-top:30rpx;">{{fireData['超时事件']}}</div>
          <div class="alarm-top-main-item-mark" style="margin-top:10rpx;">本月实时数据</div>
        </div>
        <div class="alarm-top-main-item" style="width: 70%;">
          <div class="alarm-top-main-item-title" style="color: black;font-size:28rpx;font-weight:400;">隐患处置率</div>
          <div class="alarm-top-main-item-mark" style="margin-top:16rpx;">逐步优化隐患处理流程，提高效率</div>
          <div class="alarm-top-main-item-title" style="margin-top:34rpx;color: black;font-size:28rpx;font-weight:400;">超时事件</div>
          <div class="alarm-top-main-item-mark" style="margin-top:16rpx;">超时事件会在最短时间内寻求解决</div>
        </div>
      </div>
    </div>

    <div class="content-X-title">
      其他数据
    </div>

    <div class="content-other">
      <div class="content-other-main">
        <div class="content-other-main-item">
          <div  style="font-size:22rpx;color: #56a0e6;margin-top:20rpx;">{{scoreData['微型消防站']}}</div>
          <div  style="color: #c7c7c7;font-size:22rpx;margin-top:20rpx;">微型消防站</div>
        </div>
        <div class="content-other-main-item" style="margin-left:20rpx;">
          <div  style="font-size:22rpx;color: #67C23A;margin-top:20rpx;">{{scoreData['消控室']}}</div>
          <div  style="color: #c7c7c7;font-size:22rpx;margin-top:20rpx;">消控室</div>
        </div>
        <div class="content-other-main-item" style="margin-left:20rpx;">
          <div  style="font-size:22rpx;color: #fb9224;margin-top:20rpx;">{{scoreData['运营工作']}}</div>
          <div  style="color: #c7c7c7;font-size:22rpx;margin-top:20rpx;">运营工作</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        areaItem: {},
        scoreData: {},
        maintenanceData: {},
        warnData: {},
        fireData: {},
        deviceHealthData: {}
      }
    },
    methods: {
      async handleFlashPage () {
        this.scoreData = (await this.$request('/appStatistics/ScoreByArea', 'POST', {
          areaId: this.areaItem.id
        })).data.data

        this.maintenanceData = (await this.$request('/appStatistics/maintenanceScore', 'POST', {
          areaId: this.areaItem.id
        })).data.data

        this.warnData = (await this.$request('/appStatistics/CycleRatioByFireAndWarning', 'POST', {
          areaId: this.areaItem.id
        })).data.data

        const date = new Date()
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      month = (month < 10 ? '0' + month : month)
      this.fireData = (await this.$request('/appStatistics/ScoreByFireAndWarn', 'POST', {
          areaId: this.areaItem.id,
          month: year + '-' + month
        })).data.data
        this.deviceHealthData = (await this.$request('/deviceHealthStatistics/findByParkId', 'GET', {
          id: this.areaItem.id,
          month: year + '' + month
        })).data

        this.$forceUpdate()
      }
    },
    onLoad (options) {
      this.areaItem = JSON.parse(options.item)
      this.handleFlashPage()
    }
  }
</script>

<style lang="less" scoped>
  .content{
    .content-X-title {
      margin-left: 20rpx;
      .font-huge-bold();
      color: @color-text-main;
    }
  .content-top {
    padding: 20rpx 19rpx;
    .content-top-main {
      margin: 20rpx 0;
      height: 226rpx;
      background: linear-gradient(90deg, rgba(16, 181, 208, 1) 0%, rgba(96, 89, 232, 1) 100%);
      .border-radius-large();
      display: flex;
      flex-direction: row;
      align-items: center;
      .content-top-main-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10rpx 0 48rpx;
        .content-top-main-item-title {
          font-size: 22rpx;
          color: #f6f6f6;
        }
        .content-top-main-item-mark {
          font-size: 28rpx;
          color: white;
          font-weight: bold;
        }

        .content-top-main-item-desc {
          font-size: 22rpx;
          color: #f6f6f6;
          line-height: 20rpx;
          margin-top: 50rpx;
        }

        .content-top-main-item-number {
          font-size: 22rpx;
          color: white;
          font-weight: bold;
          margin-left: 50rpx;
        }

        .content-top-main-item-desc2 {
          font-size: 22rpx;
          color: #f6f6f6;
          line-height: 20rpx;
          margin-top: 145rpx;
        }

        .content-top-main-item-number2 {
          font-size: 22rpx;
          color: white;
          font-weight: bold;
          margin-left: 50rpx;
        }

        .content-top-main-item-desc3 {
          font-size: 22rpx;
          color: #f6f6f6;
          line-height: 20rpx;
          margin-top: 115rpx;
        }

        .content-top-main-item-number3 {
          font-size: 22rpx;
          color: white;
          font-weight: bold;
          margin-left: 30rpx;
        }
      }

    }
  }
    .content-patrol {
      padding: 20rpx 19rpx;
      .content-patrol-main {
        margin: 20rpx 0;
        height: 226rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        .content-partrol-main-item {
          .border-radius-large();
          border-width : 1rpx;
          border-color: #e2e2e2;
          border-style: solid;
          height: 226rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width:40%;
          padding: 0 20rpx 0 48rpx;

          .content-patrol-main-item-mark {
            font-size: 28rpx;
            font-weight: bold;
          }
        }

      }
    }

    .alarm-top {
      padding: 20rpx 19rpx;
      .alarm-top-main {
        margin: 20rpx 0;
        height: 226rpx;
        .border-radius-large();
        border-width: 1rpx;
        border-style: solid;
        border-color: #e2e2e2;
        display: flex;
        flex-direction: row;
        align-items: center;
        .alarm-top-main-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 10rpx 0 48rpx;
          .alarm-top-main-item-title {
            font-size: 35rpx;
            color: #ef4236;
            font-weight: bold;
          }
          .alarm-top-main-item-mark {
            font-size: 22rpx;
            color:#bcbcbc;

          }

          .alarm-top-main-item-desc {
            font-size: 22rpx;
            line-height: 20rpx;
            margin-top: 50rpx;
          }

          .alarm-top-main-item-number {
            font-size: 22rpx;
            font-weight: bold;
            margin-left: 50rpx;
          }

          .alarm-top-main-item-desc2 {
            font-size: 22rpx;
            line-height: 20rpx;
            margin-top: 145rpx;
          }

          .alarm-top-main-item-number2 {
            font-size: 22rpx;
            font-weight: bold;
            margin-left: 50rpx;
          }

          .alarm-top-main-item-desc3 {
            font-size: 22rpx;
            line-height: 20rpx;
            margin-top: 115rpx;
          }

          .alarm-top-main-item-number3 {
            font-size: 22rpx;
            font-weight: bold;
            margin-left: 30rpx;
          }
        }

      }
    }

    .content-other {
      padding: 20rpx 19rpx;
      .content-other-main {
        margin: 20rpx 0;
        height: 100rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        .content-other-main-item {
          .border-radius-large();
          border-width : 1rpx;
          border-color: #e2e2e2;
          border-style: solid;
          height: 100rpx;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width:20%;

        }

      }
    }
  }
</style>
