<template>
  <div class="content">
    <div class="content-group">
      <!-- 上传图片按钮 -->
      <div class="content-group-head">照片:
      </div>
      <div class="content-group-item-chooseimg" @click="chooseImage" :style="{ padding: showImage ? '0px' : '' }">
        <div class="content-group-item-chooseimg-main" v-if="!showImage" >
          <img src="/static/images/common/photo_gray_icon.png">
        </div>
        <div class="content-group-item-chooseimg-text" v-if="!showImage" >
          (上传故障设备照片)
        </div>
        <div class="content-group-item-chooseimg-img" v-if="showImage" >
          <img :src="image" mode="widthFix">
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
        pageConfig: {},
        desc: '',
        image: '',
        showImage: false,
        pageData: {
          currentId: null
        }
      }
    },
    onLoad (options) {
      this.pageData.currentId = JSON.parse(options.id)
      this.desc = ''
      this.image = ''
      this.showImage = false
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
      async handleUploadClick () {
        let userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        mpvue.uploadFile({
          url: 'http://120.55.234.38/api/fireProcess/trueFireCon',
          fileType: 'image',
          fileName: 'file',
          filePath: this.image,
          formData: {
            userId: userInfo.id,
            fireId: this.pageData.currentId,
            con: this.desc
          },
          success: (res) => {
            // dep => console.log(res)
            mpvue.navigateBack()
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
