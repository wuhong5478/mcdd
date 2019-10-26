<template>
  <div class="content">
    <map
      id="map"
      :markers="placeData.markers"
      scale="14"
      :latitude="placeData.latitude"
      :longitude="placeData.longitude"
      show-location
      style="width: 100%; height: 70vh">
    </map>
    <div class="content-info">
      <div class="content-info-card">
        <div class="content-info-card-item" v-for="(value, key) in pageData.alertInfo" :key="key"
             v-if="key !== 'whole'">
          <div class="content-info-card-item-key">{{key}}:</div>
          <div class="content-info-card-item-value">{{value}}</div>
        </div>
      </div>
    </div>
    <div class="content-btn">
      <common-button label="火警" :flex="1" bingo="block" :handler="handleConfirmClick"></common-button>
      <common-button label="误报" :flex="1" bingo="blue" :handler="handleCancelClick"></common-button>
    </div>
  </div>
</template>

<script>
  import commonButton from '@/components/commonButton'

export default {
    components: {
      commonButton
    },
    watch: {},
    computed: {},
    data () {
      return {
        placeData: {
          latitude: '',
          longitude: '',
          markers: []
        },
        pageData: {
          alertWhole: null,
          alertInfo: {
            '设备名称': '',
            '设备地址': '',
            '报警时间': '',
            '报警数据': ''
          }
        }
      }
  },

    created () {
    },
    onLoad (opt) {
      if (opt.warnId) {
        this.handleMessageLogin(opt.warnId)
      } else {
        this.pageData.alertWhole = JSON.parse(opt.item)
        this.pageData.alertInfo['设备名称'] = this.pageData.alertWhole.devname
        this.pageData.alertInfo['设备地址'] = this.pageData.alertWhole.address
        this.pageData.alertInfo['报警时间'] = this.$moment(this.pageData.alertWhole.gmtcreate).format('YYYY-MM-DD h:mm')
        this.pageData.alertInfo['报警数据'] = this.pageData.alertWhole.eventname
        this.placeData.latitude = this.pageData.alertWhole.lat
        this.placeData.longitude = this.pageData.alertWhole.lng
        this.placeData.markers = [{
          latitude: this.pageData.alertWhole.lat,
          longitude: this.pageData.alertWhole.lng
        }]
        this.readFire()
      }
  },
    methods: {
      async handleConfirmClick () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        await this.$request('/fireProcess/trueFire', 'GET', {
          userId: userInfo.id,
          fireId: this.pageData.alertWhole.id
        })
      mpvue.redirectTo({
          url: `../homeAlertDetailUpload/main?id=${this.pageData.alertWhole.id}`
        })
    },
      async handleCancelClick () {
        // const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        // await this.$request('/fireProcess/falseFire', 'POST', {
        //   userId: userInfo.id,
        //   fireId: this.pageData.alertWhole.id
        // })
        mpvue.redirectTo({
          url: `../homeAlertCancelUpload/main?id=${this.pageData.alertWhole.id}`
        })
    },
      async handleMessageLogin (warnId) {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        const warnInfo = (await this.$request('/AppFire/selectByFireWarnId', 'POST', {
          fireWarnId: warnId
        })).data.data
        this.pageData.alertInfo['设备名称'] = warnInfo.devname
        this.pageData.alertInfo['设备地址'] = warnInfo.address
        this.pageData.alertInfo['报警时间'] = this.$moment(warnInfo.gmtcreate).format('YYYY-MM-DD h:mm')
        this.pageData.alertInfo['报警数据'] = warnInfo.eventname
        this.placeData.latitude = warnInfo.lat
        this.placeData.longitude = warnInfo.lng
        this.placeData.markers = [{
          latitude: warnInfo.lat,
          longitude: warnInfo.lng
        }]
        await this.$request('/fireNotice/read', 'GET', {
          fireId: warnId,
          type: 1,
          userId: userInfo.id
        })
        this.$forceUpdate()
      },
      async readFire () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        await this.$request('/fireNotice/read', 'GET', {
          fireId: this.pageData.alertWhole.id,
          type: 1,
          userId: userInfo.id
        })
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
      .content-info-card {
        background-size: 100% 100%;
        .content-info-card-item {
          padding: 15rpx;
          display: flex;
          flex-direction: row;
          .content-info-card-item-key {
            font-size: 28rpx;
            font-weight: 400;
            color: #898989;
            padding-right: 20rpx;
          }
          .content-info-card-item-value {
            font-size: 28rpx;
            font-weight: 300;
            color: #525252;
          }
        }
      }
    }
    .content-btn {
      .flex-row(center);
      width: 100vw;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
</style>
