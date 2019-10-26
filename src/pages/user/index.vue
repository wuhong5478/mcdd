<template>
  <div class="content">
    <div class="content-head">
      <div class="content-head-img" @click="handlePortraitClick">
        <img :src="pageData.userAvatar">
      </div>
      <div class="content-head-info">
        <div class="content-head-info-name">
          {{pageData.userName}}
        </div>
        <div class="content-head-info-tip" @click="handlePortraitClick">
          点击更换头像
        </div>
      </div>
    </div>
    <common-list :listData="pageData.infoList"></common-list>
  </div>
</template>

<script>
  import commonList from '@/components/commonList'

  export default {
    components: {
      commonList
    },

    data () {
      return {
        pageConfig: {
        },
        pageData: {
          userAvatar: '/static/images/user/head.png',
          userName: '',
          infoList: {
            'no-title': [{
              type: 'KEY_VALUE',
              key: '姓名',
              value: '赵武'
            }, {
              type: 'KEY_VALUE',
              key: '所属机构',
              value: '云栖小镇管委会'
            }, {
              type: 'KEY_VALUE',
              key: '联系方式',
              value: '13566666981'
            }],
            ' ': [{
              type: 'BUTTON_JUMP',
              key: '消息',
              callBack: this.handleMsgClick
            }],
            '  ': [{
              type: 'BUTTON_PLAIN',
              text: '退出登录',
              callBack: this.handleExitClick
            }]
          }
        }
      }
    },

    created () {},
    methods: {
      async handleFlashPage () {
        const user = mpvue.getStorageSync({key: 'userInfo'}).data

        if (user.figureId != null && user.figureId.length > 0) {
          this.pageData.userAvatar = 'http://120.55.234.38/api/getPicture?picture=' + user.figureId
        }

        this.pageData.userName = user.name
        this.pageData.infoList['no-title'] = [{
          type: 'KEY_VALUE',
          key: '姓名',
          value: user.name
        }, {
          type: 'KEY_VALUE',
          key: '所属机构',
          value: user.deptName
        }, {
          type: 'KEY_VALUE',
          key: '联系方式',
          value: user.phone
        }]
        this.$forceUpdate()
      },
      handleEditClick () {
        const url = '../userEdit/main'
        mpvue.navigateTo({
          url
        })
      },
      handlePortraitClick () {
        const url = '../userPortraitUpload/main'
        mpvue.navigateTo({
          url
        })
      },
      handleMsgClick () {
        const url = '../userMsg/main'
        mpvue.navigateTo({
          url
        })
      },
      handleExitClick () {
        mpvue.removeStorage({
          key: 'userInfo',
          success: function () {
            const url = '../login/main'
            mpvue.navigateTo({
              url: url
            })
          }
        })
      }
    },
    async onShow () {
      let that = this
      mpvue.getAuthCode({
        success: (res) => {
          mpvue.httpRequest({
            url: 'http://120.55.234.38/api/inner/login',
            method: 'POST',
            data: {
              authCode: res.authCode
            },
            dataType: 'json',
            success: function (res) {
              res.data.data.user.deptName = res.data.data.deptName
              let userInfo = res.data.data.user
              mpvue.setStorageSync({
                key: 'userInfo',
                data: userInfo
              })
              that.handleFlashPage()
            }
          })
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    overflow: auto;
    .gray-background;
    .content-head {
      .flex-row(center);
      height: 240rpx;
      padding: 40rpx;
      padding-top: 110rpx;
      background: linear-gradient(0deg, @color-main 0%, rgba(0, 165, 242, 1) 100%);
      .content-head-img {
        height: 150rpx;
        width: 150rpx;
        .border-radius-circle();
        img {
          height: 150rpx;
          width: 150rpx;
        }
      }
      .content-head-info {
        flex: 1;
        .content-head-info-name {
          .padding-normal();
          font-size: 35rpx;
          font-weight: bold;
          color: white;
        }
        .content-head-info-tip {
          padding: 0 20rpx;
          .font-small();
          color: white;
          opacity: 0.6;
        }
      }
      .content-head-edit {
        img {
          height: 45rpx;
          width: 45rpx;
        }
      }
    }
  }
</style>
