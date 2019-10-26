<template>
  <div class="content">
    <div class="content-info">
      <div class="content-info-card">
        <div class="content-info-card-item" v-for="(value, key) in pageData.alertInfo" :key="key" v-if="key !== 'whole'">
          <div class="content-info-card-item-key">{{key}}:</div>
          <div class="content-info-card-item-value">{{value}}</div>
        </div>
      </div>
    </div>
    <div class="content-media">
      <div class="content-media-title">
        视频联动
      </div>
      <div class="content-media-content">
        暂无视频
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
        pageConfig: {},
        pageStatus: {},
        pageData: {
          alertWhole: null,
          alertInfo: {
            '设备名称': '独立式烟杆报警器',
            '设备地址': '在中大产业园1号楼203室',
            '报警时间': '2018-08-01 16: 00: 00',
            '报警数据': '好多的数据真的'
          }
        }
      }
    },

    created () {},
    onLoad (opt) {
      this.pageData.alertWhole = JSON.parse(opt.item)
      this.pageData.alertInfo['设备名称'] = this.pageData.alertWhole.devname
      this.pageData.alertInfo['设备地址'] = this.pageData.alertWhole.address
      this.pageData.alertInfo['报警时间'] = this.$moment(this.pageData.alertWhole.gmtcreate).format('YYYY-MM-DD h:mm')
      this.pageData.alertInfo['报警数据'] = this.pageData.alertWhole.eventname
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
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        await this.$request('/fireProcess/falseFire', 'POST', {
          userId: userInfo.id,
          fireId: this.pageData.alertWhole.id
        })
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
      .content-info-card {
        .padding-normal();
        background-image: url('/static/images/alertDetail/back_red_pic.png');
        background-size: 100% 100%;
        .content-info-card-item {
          padding: 15rpx 0;
          display: flex;
          flex-direction: row;
          .content-info-card-item-key {
            font-size: 28rpx;
            font-weight: 400;
            color: white;
            padding-right: 20rpx;
          }
          .content-info-card-item-value {
            font-size: 28rpx;
            font-weight: 300;
            color: white;
          }
        }
      }
    }
    .content-media {
      .padding-normal();
      .content-media-title {
        font-size: 28rx;
        line-height: 84rpx;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        border-bottom: 1px solid rgba(237, 237, 237, 1);
      }
      .content-media-content {
        height: 300rpx;
        text-align: center;
        line-height: 300rpx;
        font-size: 28rx;
        color: rgba(153, 153, 153, 1);
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
