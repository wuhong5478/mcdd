<template>
  <div class="content">
    <div class="content-map">
      <map class="content-map-node" :markers="placeData.markers" :latitude="placeData.latitude" :longitude="placeData.longitude" show-location></map>
    </div>
    <div class="content-info">
      <div class="content-info-left">
        <div class="content-info-left-address">{{pageData.alertInfo.address}}</div>
        <div class="content-info-left-journey">距您{{pageData.alertInfo.journey}}米</div>
      </div>
      <div class="content-info-right" @click="handleDealFire">
        火灾结束
      </div>
    </div>
    <div class="content-contact">
      <div class="content-contact-item" v-for="(item, index) in pageConfig.contactConfig" :key="index">
        <contact-card :config="item"></contact-card>
      </div>
    </div>
    <div class="content-notic">
      <div class="content-X-title">已经通知</div>
      <div class="content-notic-list">
        <div class="content-notic-list-item" v-for="(item, index) in pageData.noticList" :key="index">
          <notic-card :config="item"></notic-card>
        </div>
      </div>
    </div>
    <div class="content-timeline">
      <div class="content-X-title">最近消息</div>
      <div class="content-timeline-main">
        <div class="content-timeline-main-item" v-for="(item, index) in pageData.timeLine" :key="index">
          <timeline-card :config="item"></timeline-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import contactCard from '@/components/contactCard'
  import noticCard from '@/components/noticCard'
  import timelineCard from '@/components/timelineCard'

  export default {
    data () {
      return {
        pageConfig: {
          contactConfig: [{
            info: '消防室负责人: 陈某某',
            phone: '13566666911'
          }, {
            info: '微消站负责人: 王某某',
            phone: '13856889999'
          }],
          testMapConfig: [{
            latitude: '27',
            longitude: '111',
            title: '尼玛村',
            ll: {
              content: 'Hello Label',
              color: '#000000',
              fontSize: 12,
              borderRadius: 3,
              bgColor: '#ffffff',
              padding: 14
            }
          }]
        },
        placeData: {
          latitude: '',
          longitude: '',
          markers: []
        },
        pageData: {
          orderList: {},
          alertInfo: {},
          noticList: [{
            name: '陈某某',
            role: '消防室人员',
            company: '浙江省XXXX物业有限公司',
            status: 1
          }, {
            name: '陈某某',
            role: '消防室人员',
            company: '浙江省XXXX物业有限公司',
            status: 0
          }, {
            name: '陈某某',
            role: '消防室人员',
            company: '浙江省XXXX物业有限公司',
            status: 1
          }, {
            name: '陈某某',
            role: '消防室人员',
            company: '浙江省XXXX物业有限公司',
            status: 0
          }],
          eventDetail: {
            device: '独立式烟感探测器',
            address: '中大园区1号楼203室',
            confirmUser: '陈某某',
            confirmUnit: '中大园区1号楼消控室',
            describe: '火灾描述火灾描述火灾描述火灾描述火灾描述火灾描述火灾描述火灾描述',
            img: ['', '', ''],
            timeLine: ['00:00:00', '00:03:00', '00:05:00', '00:08:00']
          },
          timeLine: []
        }
      }
    },
    components: {
      timelineCard,
      contactCard,
      noticCard
    },
    computed: {},
    methods: {
      async initTimeLine () {
        this.pageData.timeLine = []

        const controlRoom = (await this.$request('/emergencyScreen/controlRoom/getData', 'GET', {
          deviceName: this.pageData.alertInfo.devicename,
          emId: this.pageData.alertInfo.id,
          productKey: this.pageData.alertInfo.productkey,
          type: 'controlRoom'
        })).data.data.data[0]

        const miniFireStation = (await this.$request('/emergencyScreen/miniFireStation/getData', 'GET', {
          deviceName: this.pageData.alertInfo.devicename,
          emId: this.pageData.alertInfo.id,
          productKey: this.pageData.alertInfo.productkey,
          type: 'miniFireStation'
        })).data.data.data[0]

        this.pageConfig.contactConfig = [{
          info: '消防室负责人: ' + controlRoom.userName,
          phone: controlRoom.telphone
        }, {
          info: '微消站负责人: ' + miniFireStation.userName,
          phone: controlRoom.telphone
        }]

        this.pageData.noticList = (await this.$request('/fireNotice/list', 'GET', {
          fireId: this.pageData.alertInfo.id,
          pageNo: 0
        })).data.data.rows.map(item => ({
          name: item.userName,
          company: item.deptName,
          status: item.isRead
        }))
        this.pageData.orderList = (await this.$request('/fireProcess/fireorder', 'GET', {
          fireId: this.pageData.alertInfo.id
        })).data.data
        for (let i = 0; i < this.pageData.orderList.length; i++) {
          const descArr = JSON.parse(this.pageData.orderList[i].con)
          let desc = ''
          for (let j = 0; j < descArr.length; j++) {
            desc += descArr[j].name + '：' + descArr[j].data + '\n'
          }
          this.pageData.timeLine.push({
            time: this.pageData.orderList[i].createTime,
            title: this.pageData.orderList[i].typeDesc,
            description: desc
          })
        }
      },
      async handleDealFire () {
        mpvue.redirectTo({
          url: `../dealFire/main?id=${this.pageData.alertInfo.id}`
        })
      }
    },
    mounted () {
    },
    onLoad (opt) {
      this.pageData.alertInfo = JSON.parse(opt.item)
      this.pageData.alertInfo.journey = 600
      this.placeData.latitude = this.pageData.alertInfo.lat
      this.placeData.longitude = this.pageData.alertInfo.lng
      this.placeData.markers = [{
        latitude: this.pageData.alertInfo.lat,
        longitude: this.pageData.alertInfo.lng
      }]
      this.initTimeLine()
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .content-X-title {
      padding: 20rpx 0;
      .font-huge-bold();
      color: @color-text-main;
    }
    .content-map {
      height: 300rpx;
      .content-map-node {
        height: 300rpx ! important;
      }
    }
    .content-info {
      .flex-row(center);
      .padding-normal();
      .content-info-left {
        flex: 1;
        .content-info-left-address {
          .font-large-bold();
          line-height: 40rpx;
          color: @color-text-main;
        }
        .content-info-left-journey {
          .font-medium();
          color: @color-text-minor;
        }
      }
      .content-info-right {
        padding: 15rpx 30rpx;
        .border-radius-small();
        .font-large-bold();
        color: white;
        background: @color-main;
      }
    }
    .content-notic {
      .padding-normal();
    }
    .content-timeline {
      .padding-normal();
    }
  }
</style>
