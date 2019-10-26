<template>
  <div class="content">
    <div class="content-nav">
      <common-nav-header :currentIndex="pageStatus.currentNavIndex" :itemText="pageConfig.navList"></common-nav-header>
    </div>
    <div class="content-info" v-show="getPageIndex === 1">
      <div class="content-info-item" v-for="(value, key) in deviceInfo" :key="key">
        <div class="content-info-item-key">{{key}}:</div>
        <div class="content-info-item-value">{{value}}</div>
      </div>
    </div>

    <div class="content-status" v-show="getPageIndex === 0">
      <div class="content-status-card">
        <div class="content-status-card-item" v-for="(value, key) in deviceMain" :key="key">
          <div class="content-status-card-item-key">{{key}}:</div>
          <div class="content-status-card-item-value">{{value}}</div>
        </div>
      </div>
      <div class="content-status-item" v-for="(value, key) in deviceStatus" :key="key" v-if="key !== 'main'">
        <div class="content-status-item-key">{{key}}:</div>
        <div class="content-status-item-value">{{value}}</div>
      </div>
      <div class="content-status-btn">
        <common-button label="上报隐患" :flex="1" bingo="block" :handler="handleWarnClick"></common-button>
        <common-button label="设备正常" :flex="1" bingo="blue" :handler="handleNormalClick"></common-button>
      </div>
    </div>
  </div>
</template>

<script>
  import commonNavHeader from '@/components/commonNavHeader'
import commonButton from '@/components/commonButton'

export default {
    components: {
      commonNavHeader,
      commonButton
    },
    watch: {
      pageStatus: {
        handler (newValue, oldValue) {
          // this.pageStatus = JSON.parse(JSON.stringify(this.pageStatus))
          this.$forceUpdate()
      },
        deep: true
      }
    },
    computed: {
      getPageIndex () {
        return this.pageStatus.currentNavIndex.data
    }
    },
    data () {
      return {
        wholeDeviceInfo: {},
        pageConfig: {
          navList: ['状态信息', '设备信息']
        },
        pageStatus: {
          currentNavIndex: {
            data: 0
          }
        },
        deviceMain: {
          '设备状态': '在线',
          '剩余电量': '97%',
          '上次推送': '2016-08-01  12: 00: 00'
        },
        deviceName: '',
        deviceInfo: {
          '设备ID': '1111111',
          '设备型号': '电器火灾',
          '设备类型': '',
          '经纬度': '123.3332，111.112234',
          '部署区域': '中大产业园',
          '部署位置': '中大产业园5号楼',
          '权属机构': '云栖小镇管委会',
          '最后上线时间': '2016-08-01  12: 00: 00'
        },
        deviceStatus: {
          'A相电流': '10A',
          'B相电流': '10A',
          'C相电流': '10A',
          'D相电流': '10A',
          'E相电流': '10A',
          'F相电流': '10A'
        }
      }
  },

    created () {
    },
    onLoad (option) {
      this.deviceName = option.deviceName
    this.handleFlashPage()
  },
    methods: {
      async handleFlashPage () {
        this.wholeDeviceInfo = (await this.$request('/device/detail', 'GET', {
          name: this.deviceName
        })).data.data

      this.deviceInfo = {
          '设备ID': this.wholeDeviceInfo.device.id,
          '设备型号': this.wholeDeviceInfo.device.productName,
          '设备类型': this.wholeDeviceInfo.device.categoryName,
          '经纬度': this.wholeDeviceInfo.device.longitude + ',' + this.wholeDeviceInfo.device.latitude,
          '部署区域': this.wholeDeviceInfo.device.districtName,
          '部署位置': this.wholeDeviceInfo.device.address,
          '权属机构': this.wholeDeviceInfo.device.organizationName,
          '最后上线时间': this.$moment(this.wholeDeviceInfo.device.lastUploadTime).format('YYYY-MM-DD h:mm')
        }
      const propertyArr = this.wholeDeviceInfo.property
      let deviceStatusObj = {}
      let deviceMainObj = {
          '设备状态': this.wholeDeviceInfo.device.health,
          '上次推送': this.$moment(this.wholeDeviceInfo.device.lastUploadTime).format('YYYY-MM-DD h:mm')
        }
      for (let i = 0; i < propertyArr.length; i++) {
          if (propertyArr[i].fundId === 'BatPt') {
            deviceMainObj['剩余电量'] = propertyArr[i].value + '%'
        } else {
            deviceStatusObj[propertyArr[i].funName] = propertyArr[i].value
        }
        }
        this.deviceStatus = deviceStatusObj
      this.deviceMain = deviceMainObj
      this.$forceUpdate()
    },
      handleWarnClick () {
        mpvue.navigateTo({
          url: `../deviceWarnUpload/main?item=${JSON.stringify(this.wholeDeviceInfo.device)}`
        })
      },
       handleNormalClick () {
        mpvue.navigateBack()
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    position: relative;
    .content-info {
      .padding-normal();
      .content-info-item {
        padding: 15rpx 20rpx;
        display: flex;
        flex-direction: row;
        .content-info-item-key {
          font-size: 28rpx;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          padding-right: 20rpx;
        }
        .content-info-item-value {
          font-size: 28rpx;
          font-weight: 300;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .content-status {
      .padding-normal();
      .content-status-card {
        .padding-normal();
        background-image: url('/static/images/deviceDetail/back_blue_pic.png');
        background-size: 100% 100%;
        .content-status-card-item {
          padding: 15rpx 0;
          display: flex;
          flex-direction: row;
          .content-status-card-item-key {
            font-size: 28rpx;
            font-weight: 400;
            color: white;
            padding-right: 20rpx;
          }
          .content-status-card-item-value {
            font-size: 28rpx;
            font-weight: 300;
            color: white;
          }
        }
      }
      .content-status-item {
        padding: 15rpx 20rpx;
        display: flex;
        flex-direction: row;
        .content-status-item-key {
          font-size: 28rpx;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          padding-right: 20rpx;
        }
        .content-status-item-value {
          font-size: 28rpx;
          font-weight: 300;
          color: rgba(102, 102, 102, 1);
        }
      }
      .content-status-btn {
        .flex-row(center);
        width: 100vw;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
</style>
