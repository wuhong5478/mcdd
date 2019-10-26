<template>
  <div class="content">
    <map
      id="map"
      :markers="placeData.markers"
      scale="14"
      :latitude="placeData.latitude"
      :longitude="placeData.longitude"
      show-location
      style="height: 40vh">
    </map>
    <div class="content-info">
      <div class="content-info-card">
        <div class="content-top">
          <div class="content-top-device">{{pageData.alertWhole.devname}}</div>
          <div class="content-top-status" :style="{ color: statusConfig[pageData.alertWhole.status].color }">{{statusConfig[pageData.alertWhole.status].label}}</div>
        </div>
        <div class="content-info-card-item" v-for="(value, key) in pageData.alertInfo" :key="key"
             v-if="key !== 'whole'">
          <div class="content-info-card-item-key">{{key}}:</div>
          <div class="content-info-card-item-value">{{value}}</div>
        </div>
        <div class="content-info-card-item">
          <div class="content-info-card-item-key">照片:</div>
          <div class="content-info-card-item-image"><img :src="pageData.image"></img></div>
        </div>
      </div>
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
        hideImage: true,
        statusConfig: [{
          label: '待确认',
          color: '#999999'
        }, {
          label: '火警',
          color: '#999999'
        }, {
          label: '误报',
          color: '#999999'
        }],
        placeData: {
          latitude: '',
          longitude: '',
          markers: []
        },
        pageData: {
          image: '',
          alertWhole: null,
          alertInfo: {
            '设备名称': '',
            '设备地址': '',
            '报警时间': '',
            '报警数据': '',
            '描述': ''
          }
        }
      }
  },

    created () {
    },
    async onLoad (opt) {
      this.pageData.alertWhole = JSON.parse(opt.item)
    this.pageData.alertInfo['设备名称'] = this.pageData.alertWhole.devname
    this.pageData.alertInfo['设备地址'] = this.pageData.alertWhole.address
    this.pageData.alertInfo['报警时间'] = this.$moment(this.pageData.alertWhole.gmtcreate).format('YYYY-MM-DD h:mm')
    this.pageData.alertInfo['报警数据'] = this.pageData.alertWhole.eventname
      this.pageData.alertInfo['描述'] = '测试描述'
    this.placeData.latitude = this.pageData.alertWhole.lat
    this.placeData.longitude = this.pageData.alertWhole.lng
    this.placeData.markers = [{
        latitude: this.pageData.alertWhole.lat,
        longitude: this.pageData.alertWhole.lng
      }]
    const orderList = (await this.$request('/fireProcess/fireorder', 'GET', {
      fireId: this.pageData.alertWhole.id,
      type: 8
    })).data.data
    for (let i = 0; i < orderList.length; i++) {
      const descArr = JSON.parse(orderList[i].con)
      for (let j = 0; j < descArr.length; j++) {
        if (descArr[j].name === '图片') {
          this.pageData.image = 'http://120.55.234.38/api/getPicture?picture=' + descArr[j].data
        }
      }
    }
      this.$forceUpdate()
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

        .content-top {
          .flex-row(center, space-between);
          .font-large-bold();
          .content-top-device {
            padding: 10rpx;
            .font-large-bold();
          }
          .content-top-status {
            .font-large();
            color: @color-text-normal;
          }
        }
        .content-info-card-item {
          padding: 10rpx;
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

          .content-info-card-item-image {
            img{
              height: 300rpx;
            }
          }
        }
      }
    }
  }
</style>
