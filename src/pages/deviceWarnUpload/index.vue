<template>
  <div class="content">

    <div class="content-group">
      <div class="content-group-item-select">
        <div class="content-group-item-select-key">隐患等级:</div>
        <div class="content-group-item-select-value">
          <picker :value="level" @change="handlePickerChange($event)" :range="levelList" >
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

    <div class="content-group">
      <!-- 键值多行输入框 -->
      <div class="content-group-item-textarea">
        <div class="content-group-item-textarea-key">描述:</div>
        <div class="content-group-item-textarea-main">
          <textarea auto-height placeholder="请在此处输入内容"  v-model="desc" :show-count="false" />
        </div>
      </div>
    </div>

    <div class="content-group">
      <!-- 上传图片按钮 -->
      <div class="content-group-head">照片:
      </div>
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
    <div class="content-group">
      <div>
        <div class="content-group-item-button" style="color: white; background: #108ee9" @click="handleUploadClick">
          <div class="content-group-item-button-text">提交信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        desc: '',
        image: '',
        showImage: false,
        level: '',
        pageConfig: {},
        levelList: ['重大', '一般'],
        pageData: {
          infoWhole: null,
          parkName: null
        }
      }
    },
    async onLoad (options) {
      this.pageData.infoWhole = JSON.parse(options.item)
      console.log(this.pageData.infoWhole)
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
      handlePickerChange (e) {
        this.level = this.levelList[e.mp.detail.value]
        this.$emit('pick', this.level)
      },
      handleUploadClick () {
        console.log('handleUploadClick')
        const levalConfig = ['', '特级重大', '重大', '较大', '一般']
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        let formData = {
          deviceName: this.pageData.infoWhole.deviceName,
          latitude: this.pageData.infoWhole.latitude,
          longitude: this.pageData.infoWhole.longitude,
          parkName: this.pageData.infoWhole.districtName,
          propertyName: '绿城物业',
          userName: userInfo.name,
          warningAddress: this.pageData.infoWhole.address,
          warningDescription: this.desc,
          warningLevel: levalConfig.indexOf(this.level)
        }
        // dep => console.log('formData', formData)
        mpvue.uploadFile({
          url: 'http://118.31.247.145:8088/PatrolInspection/reportWarning',
          fileType: 'image',
          fileName: 'file',
          filePath: this.image,
          formData,
          success: (res) => {
            // dep => console.log(res)
            mpvue.navigateBack()
          },
          fail: (e) => {
            console.log(e)
            // dep => console.log(e)
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
</style>
