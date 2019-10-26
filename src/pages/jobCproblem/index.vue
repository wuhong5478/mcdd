<template>
  <div class="content" v-if="!flashing">
    <div class="content-group">
      <div class="content-group-head">地址信息
      </div>
      <div class="content-group-item">
      <div class="content-group-item-select">
        <div class="content-group-item-select-key">上报地址:</div>
        <div class="content-group-item-select-value">
          <picker :value="areaIndex" @change="handleAreaChange($event)" :range="areaList" >
            <div class="picker">
              {{area || (areaList.length > 0 ? '请选择' : '暂无可选项')}}
            </div>
          </picker>
        </div>
        <div class="content-group-item-select-icon">
          <img src="/static/images/common/more_gray_icon.png">
        </div>
      </div>
    </div>
      <div class="content-group-item">
        <div class="content-group-item-input">
          <div class="content-group-item-input-key">详细地址:</div>
          <div class="content-group-item-input-value">
            <input placeholder-class="content-group-item-input-value-plc" v-model="place">
          </div>
        </div>
      </div>
    </div>
    <div class="content-group">
      <div class="content-group-head">隐患信息
      </div>
      <div class="content-group-item">
        <div class="content-group-item-select">
          <div class="content-group-item-select-key">隐患等级:</div>
          <div class="content-group-item-select-value">
            <picker :value="levelIndex" @change="handleLevelChange($event)" :range="levelList" >
              <div class="picker">
                {{level || (levelList.length > 0 ? '请选择' : '暂无可选项')}}
              </div>
            </picker>
          </div>
          <div class="content-group-item-select-icon">
            <img src="/static/images/common/more_gray_icon.png">
          </div>
        </div>
      </div>
      <div class="content-group-item">
        <div class="content-group-item-input">
          <div class="content-group-item-input-key">隐患名称:</div>
          <div class="content-group-item-input-value">
            <input placeholder-class="content-group-item-input-value-plc" v-model="hiddangerName">
          </div>
        </div>
      </div>
    </div>
    <div class="content-group">
      <!-- 上传图片按钮 -->
      <div class="content-group-head">上传照片
      </div>
      <div class="content-group-item">
      <div class="content-group-item-chooseimg" @click="chooseImage" :style="{ padding: showImage ? '0px' : '' }">
        <div class="content-group-item-chooseimg-main" v-if="!showImage" >
          <img src="/static/images/common/photo_gray_icon.png">
        </div>
        <div class="content-group-item-chooseimg-text" v-if="!showImage" >
          (上传隐患设备照片)
        </div>
        <div class="content-group-item-chooseimg-img" v-if="showImage" >
          <img :src="image" mode="widthFix">
        </div>
      </div>
      </div>
    </div>
    <div class="content-group">
      <div class="content-group-head">隐患描述
      </div>
      <div class="content-group-item">
      <!-- 键值多行输入框 -->
      <div class="content-group-item-textarea">
        <div class="content-group-item-textarea-key"></div>
        <div class="content-group-item-textarea-main">
          <textarea auto-height placeholder="请在此处输入内容"  v-model="desc" :show-count="false" />
        </div>
      </div>
      </div>
    </div>
    <div class="content-group">
      <div class="content-group-item">
        <div class="content-group-item-button" style="color: white; background: #108ee9" @click="handleDealClick">
          <div class="content-group-item-button-text">提交信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        flashing: false,
        place: '',
        desc: '',
        image: '',
        showImage: false,
        area: '',
        areaIndex: '',
        areaList: ['园区1', '园区2', '园区3', '园区4'],
        level: '',
        levelIndex: '',
        levelList: ['重大', '一般'],
        hiddangerName: ''
      }
    },
    watch: {
    },
    async onLoad (options) {
      this.place = ''
      this.desc = ''
      this.image = ''
      this.showImage = false
      this.area = ''
      this.areaIndex = ''
      this.level = ''
      this.levelIndex = ''
      this.hiddangerName = ''
      this.areaList = (await this.$request('/architecture/selectAllArea', 'POST')).data.data.map(item => item.areaName)
    },
    created () {},
    methods: {
      async chooseImage () {
        let res = await this.$util.chooseImage({
          sourceType: ['camera', 'album'],
          count: 1
        })
        if (res.filePaths.length > 0) {
          this.image = res.filePaths[0]
          this.showImage = true
        }
        this.$forceUpdate()
      },
      handleAreaChange (e) {
        this.area = this.areaList[e.mp.detail.value]
        this.areaIndex = e.mp.detail.value
        this.$emit('pick', this.area)
      },
      handleLevelChange (e) {
        this.level = this.levelList[e.mp.detail.value]
        this.levelIndex = e.mp.detail.value
        this.$emit('pick', this.level)
      },
      handleDealClick () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        const levalConfig = ['', '特级重大', '重大', '较大', '一般']
        if (this.area.length === 0) {
          mpvue.alert({content: '请选择上报地址', buttonText: '确定'})
          return false
        }

        if (this.level.length === 0) {
          mpvue.alert({content: '请选择隐患等级', buttonText: '确定'})
          return false
        }

        if (this.hiddangerName.length === 0) {
          mpvue.alert({content: '请输入隐患名称', buttonText: '确定'})
          return false
        }

        if (this.image.length === 0) {
          mpvue.alert({content: '请上传图片', buttonText: '确定'})
          return false
        }
        mpvue.uploadFile({
          url: 'http://120.55.234.38/api/taskwarn/addtaskwarn',
          fileType: 'image',
          fileName: 'file',
          filePath: this.image,
          formData: {
            park: this.area,
            place: this.place,
            level: levalConfig.indexOf(this.level),
            hiddangerName: this.hiddangerName,
            hiddenDescript: this.desc,
            problemReporter: userInfo.id
          },
          success: (res) => {
            // dep => console.log(res)
            const resData = JSON.parse(res.data)
            if (resData.code === 200) {
              mpvue.showToast({
                type: 'success',
                content: '添加成功',
                duration: 2000,
                success: () => {
                  mpvue.navigateBack()
                }
              })
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    width: 100vw;
    border-top: 1px solid #f2f2f2;
    font-size: 14px;
    color: @color-text-normal;
    .white-background();
    .content-group {
      .content-group-head {
        .gray-background;
        .padding-normal();
        .flex-row(@AI: flex-end);
        color: @color-text-minor;
      }
      .content-group-item {
        .border-bottom();
        .content-group-item-text {
          .padding-normal();
          .content-group-item-text-text {}
        }
        .content-group-item-img {
          padding: 20rpx;
          img {
            width: 100%;
          }
        }
        .content-group-item-keyv {
          .flex-row(center);
          padding: 30rpx 20rpx;
          .content-group-item-keyv-key {
            flex: 2
          }
          .content-group-item-keyv-value {
            color: @color-text-holder;
            flex: 7;
          }
        }
        .content-group-item-textarea {
          .padding-normal();
          .content-group-item-textarea-key {}
          .content-group-item-textarea-main {
            margin: 30rpx 0;
            .gray-background;
            .border-radius-normal();
            textarea {
              .padding-normal();
              .gray-background;
              color: @color-text-holder;
              .font-medium();
            }
          }
        }
        .content-group-item-select {
          .flex-row(center);
          padding: 22rpx 20rpx;
          .content-group-item-select-key {
            flex: 2
          }
          .content-group-item-select-value {
            flex: 7;
            color: @color-text-holder;
            input {
              color: @color-text-holder;
              .font-medium();
            }
          }
          .content-group-item-select-icon {
            img {
              height: 40rpx;
              width: 40rpx;
            }
          }
        }
        .content-group-item-input {
          .flex-row(center);
          .padding-normal();
          .content-group-item-input-key {
            flex: 2
          }
          .content-group-item-input-value {
            flex: 7;
            input {
              height: 38rpx;
              color: @color-text-holder;
              .font-medium();
            }
          }
        }
        .content-group-item-jump {
          .flex-row(center);
          .content-group-item-jump-key {
            .padding-normal();
            flex: 1
          }
          .content-group-item-jump-icon {
            .padding-normal();
            img {
              height: 40rpx;
              width: 40rpx;
            }
          }
        }
        .content-group-item-answer {
          .padding-normal();
          margin: 24rpx;
          opacity: 0.5;
          color: white;
          .content-group-item-answer-text {}
        }
        .content-group-item-chooseimg {
          .flex-column(center);
          padding: 44rpx 24rpx 24rpx 24rpx;
          /*
                          &::after {
                              content: '(上传隐患设备照片)';
                              display: block;
                              .padding-normal();
                              color: @color-text-holder;
                              .font-medium();
                          }
                          */
          .content-group-item-chooseimg-main {
            .flex-row(center, center);
            height: 100rpx;
            width: 100rpx;
            .border-radius-large();
            border: 4rpx solid rgba(242, 242, 242, 1);
            img {
              height: 50rpx;
              width: 50rpx;
            }
          }
          .content-group-item-chooseimg-text {
            .padding-normal();
            color: @color-text-holder;
            .font-medium();
          }
          .content-group-item-chooseimg-img {
            padding: 0;
          }
        }
        .content-group-item-button {
          .content-group-item-button-text {
            height: 48px;
            line-height: 48px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
