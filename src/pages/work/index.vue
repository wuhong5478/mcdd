<template>
  <div class="content">
    <div class="content-search">
      <div><img src="/static/images/work/work_top_pic.png" mode="widthFix"></div>
      <div class="content-search-shell"></div>
    </div>
    <div class="content-shell">
      <div class="content-bar">
        <div class="content-bar-item" v-for="(item, key) in pageConfig.barList" :key="key" @click="handleTabClick(item.url)">
          <div class="content-bar-item-icon">
            <img :src="item.src" :style="item.style">
          </div>
          <div class="content-bar-item-label">
            {{key}}
          </div>
        </div>
      </div>
    </div>
    <div class="content-device">
      <div class="content-X-title">
        园区设备
      </div>
      <!-- [ deprecated ]
        <div class="content-device-main">
          <div class="content-device-main-alert">
            <div class="content-device-main-X-title">设备报警</div>
            <div class="content-device-main-X-content">更多设备报警信息</div>
            <common-button label="点击进入"></common-button>
            <img src="/static/images/work/alert_opa_icon.png">
          </div>
          <div class="content-device-main-warn">
            <div class="content-device-main-X-title">设备故障</div>
            <div class="content-device-main-X-content">更多设备故障信息</div>
            <common-button label="点击进入"></common-button>
            <img src="/static/images/work/tool_opa_icon.png">
          </div>
        </div>
        -->
      <div class="content-device-main">
        <div class="content-device-main-doc">
          <div class="content-device-main-X-title">设备档案</div>
          <div class="content-device-main-X-content">更多设备信息</div>
          <common-button label="点击进入" :handler="handleDeviceClick"></common-button>
        </div>
      </div>
    </div>
    <div class="content-warn">
      <div class="content-X-title">
        园区隐患
      </div>
      <div class="content-warn-item" v-for="item in pageData.warnList" :key="item">
        <div class="content-warn-item-title">
          <div class="content-warn-item-title-icon">
            <img src="/static/images/work/file_white_icon.png">
          </div>
          <div class="content-warn-item-title-name">{{item.title}}</div>
          <div class="content-warn-item-title-time">{{item.time}}</div>
        </div>
        <div class="content-warn-item-main">
          <div class="content-warn-item-main-item" v-for="(innerItem, key) in item" :key="key" v-if="key !== 'title' && key !== 'time' && key !== 'photoArr' && key !== 'whole' && key !== 'livePhoto'">
            <div class="content-warn-item-main-item-key">{{key}}</div>
            <div class="content-warn-item-main-item-value">{{innerItem}}</div>
          </div>
          <div class="content-warn-item-main-item">
            <div class="content-warn-item-main-item-key">隐患照片：</div>
            <div class="content-warn-item-main-item-imgs">
              <img v-for="(img, innerIndex) in item['photoArr']" :key="innerIndex" :src="img">
            </div>
          </div>
        </div>
        <div class="content-warn-item-button">
          <notice-button label="促办" bingo="red" :config="item.whole"></notice-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonButton from '@/components/commonButton'
  import noticeButton from '@/components/noticeButton'

  export default {
    components: {
      commonButton,
      noticeButton
    },

    data () {
      return {
        pageConfig: {
          barList: {
            '火警': {
              src: '/static/images/work/light_blue_icon.png',
              url: '../townAlertList/main',
              style: {
                height: '100rpx',
                width: '100rpx'
              }
            },
            '隐患': {
              src: '/static/images/work/search_red_icon.png',
              url: '../townProblem/main',
              style: {
                height: '100rpx',
                width: '85rpx'
              }
            },
            '巡检': {
              src: '/static/images/work/tool_blue_icon.png',
              url: '../homeCheck/main',
              style: {
                height: '100rpx',
                width: '100rpx'
              }
            },
            '维保': {
              src: '/static/images/work/protect_yellow_icon.png',
              url: '../maintenance/main',
              style: {
                height: '87rpx',
                width: '100rpx'
              }
            }
          }
        },
        pageData: {
          warnList: []
        }
      }
    },
    methods: {
      async handleFlashPage () {
        const levelObj = {1: '特级重大', 2: '重大', 3: '较大', 4: '一般'}
        let warnList = (await this.$request('/AppWarning/AppWarning', 'GET', {
          pageNo: 1,
          pageSize: 3,
          institutionType: 0,
          workOrderStates: 5
        })).data.data.rows.map(item => ({
          title: item.source,
          time: item.reportTime,
          '隐患名称：': item.hiddangerName,
          '隐患地址：': item.place,
          '隐患等级：': levelObj[item.level],
          '隐患描述：': item.hiddenDescript,
          livePhoto: item.livePhoto,
          whole: item
        }))
        console.log(warnList)
        for (let i = 0; i < warnList.length; i++) {
          let photoArr = []
          if (warnList[i].livePhoto != null) {
          if (warnList[i].livePhoto.indexOf('.') > 0) {
            photoArr.push('http://118.31.247.145:8088/getPicture?picture=' + warnList[i].livePhoto)
          } else {
            const photo = (await this.$request('/taskwarn/getiotpictureUrl', 'GET', {
              deviceName: warnList[i].whole.equipment,
                productKey: warnList[i].whole.productKey,
              type: 0,
              pictureId: warnList[i].livePhoto
            })).data.data
            photoArr.push(photo)
          }
          warnList[i].photoArr = photoArr
          }
        }
        this.pageData.warnList = warnList
        this.$forceUpdate()
      },
      handleDeviceClick () {
        console.log('handleDeviceClick')
        // dep => console.log('进入设备列表')
        const url = '../townWorkDevice/main'
        mpvue.navigateTo({
          url
        })
      },
      handleTabClick (url) {
        if (url) {
          mpvue.navigateTo({
            url
          })
        }
      },
     async handleWarnClick (id) {
        const res = (await this.$request('/noticePerson', 'GET', {
          id: id,
          type: 1
        })).data
       console.log(res)
      }
    },
    onShow () {
      this.handleFlashPage()
    },
    created () {
      this.handleFlashPage()
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
    .content-search {
      position: relative;
      height: 390rpx;
      background: gray;
      img {
        width: 100vw;
      }
      .content-search-shell {
        z-index: 9;
        background: linear-gradient(0deg, @color-main 0%, rgba(0, 197, 222, 1) 100%);
        opacity: 0.6;
        position: absolute;
        top: 0;
        height: 390rpx;
        width: 100vw;
      }
    }
    .content-shell {
      height: 150rpx;
    }
    .content-bar {
      .flex-row(center, space-around);
      .white-background();
      position: relative;
      z-index: 99;
      top: -100rpx;
      margin: 0 20rpx;
      padding-bottom: 40rpx;
      padding-top: 20rpx;
      .box-shadow-large();
      .border-radius-large();
      .content-bar-item {
        .flex-column(center);
        .content-bar-item-icon {
          .padding-normal();
          img {
            height: 100rpx;
            width: 100rpx;
          }
        }
        .content-bar-item-label {
          .font-medium-bold();
          color: @color-text-main;
          opacity: 0.9;
        }
      }
    }
    .content-device {
      .padding-normal();
      .content-device-main {
        .flex-row();
        height: 274rpx;
        .content-device-main-X-title {
          .font-huge-bold();
          color: white;
        }
        .content-device-main-X-content {
          padding: 20rpx 0;
          .font-large-bold();
          color: white;
          opacity: 0.8;
        }
        .content-device-main-alert {
          .flex-column(@JC: center);
          position: relative;
          padding: 0 33rpx;
          flex: 1;
          background: linear-gradient(90deg, rgba(0, 197, 222, 1) 0%, rgba(0, 165, 242, 1) 100%);
          .border-radius-normal();
          img {
            position: absolute;
            right: 0;
            bottom: 0;
            height: 200rpx;
            width: 200rpx;
          }
        }
        .content-device-main-warn {
          .flex-column(@JC: center);
          position: relative;
          padding: 0 33rpx;
          flex: 1;
          margin-left: 15rpx;
          background: linear-gradient(90deg, rgba(0, 197, 222, 1) 0%, rgba(0, 197, 222, 1) 100%);
          .border-radius-normal();
          img {
            position: absolute;
            right: 0;
            bottom: 0;
            height: 200rpx;
            width: 178rpx;
          }
        }
        .content-device-main-doc {
          .flex-column(@JC: center);
          position: relative;
          padding: 0 33rpx;
          flex: 1;
          background-image: url('/static/images/work/doc_opa_pic.png');
          background-size: 100% 100%;
          .border-radius-normal();
        }
      }
    }
    .content-warn {
      .padding-normal();
      .content-warn-item {
        .padding-normal();
        position: relative;
        margin-top: 35rpx;
        .white-background();
        .box-shadow-large();
        .border-radius-large();
        .content-warn-item-title {
          .flex-row(center);
          padding: 10rpx 0;
          .content-warn-item-title-icon {
            margin-right: 30rpx;
            width: 35rpx;
            height: 35rpx;
            background: rgba(255, 0, 0, 1);
            opacity: 0.8;
            .border-radius-circle();
            text-align: center;
            line-height: 35rpx;
            img {
              width: 20rpx;
              height: 28rpx;
            }
          }
          .content-warn-item-title-name {
            .font-medium-bold();
            color: @color-text-main;
            opacity: 0.9;
          }
          .content-warn-item-title-time {
            flex: 1;
            text-align: right;
            .font-medium-bold();
            color: @color-text-main;
            opacity: 0.64;
          }
        }
        .content-warn-item-main {
          .content-warn-item-main-item {
            .flex-row();
            padding: 9rpx 0;
            .content-warn-item-main-item-key {
              padding-right: 20rpx;
              .font-medium-bold();
              color: @color-text-main;
              opacity: 0.9;
            }
            .content-warn-item-main-item-value {
              .font-medium-bold();
              color: @color-text-main;
              opacity: 0.7;
            }
            .content-warn-item-main-item-imgs {
              .flex-row();
              img {
                height: 80rpx;
                width: 80rpx;
                padding: 5rpx;
              }
            }
          }
        }
        .content-warn-item-button {
          position: absolute;
          right: 24rpx;
          bottom: 18rpx;
        }
      }
    }
  }
</style>
