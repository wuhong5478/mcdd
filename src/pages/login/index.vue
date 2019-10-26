<template>
  <div>
    <div class="outer_label">
      <img class="inner_label login_logo" src="/static/images/login/login.png">
    </div>
    <div class="login_form">
      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="手机号" v-model="phone"/>
      <button class="login_btn" @click="login">登录</button>

    </div>
  </div>
</template>



<script>
  export default {
    data () {
      return {
        phone: ''
      }
    },
    methods: {
       checkPhone (phone) {
       if (!(/^1[3456789]\d{9}$/.test(phone))) {
        return false
        } else {
         return true
       }
       },
      login () {
        if (!this.checkPhone(this.phone)) {
          mpvue.alert({content: '请输入正确的手机号', buttonText: '确定'})
          return false
        }
        mpvue.getAuthCode({
          success: (res) => {
            mpvue.httpRequest({
              url: 'http://120.55.234.38/api/inner/loginWithPhone',
              method: 'POST',
              data: {
                authCode: res.authCode,
                phone: this.phone
              },
              dataType: 'json',
              success: function (res) {
                if (res.data.code === 200) {
                let userRole = res.data.data.user.roleId
                let role = ''
                if (userRole === 'a97fa06a-fcfb-497a-81a6-42bc69552f87') {
                  role = 'wyry'
                } else if (userRole === 'f662062c-d5da-4ad9-a125-3e7ff5300794') {
                  role = 'wyjl'
                } else if (userRole === '3') {
                  role = 'wbjl'
                } else if (userRole === '4') {
                  role = 'wbry'
                } else if (userRole === '2') {
                  role = 'gwh'
                }
                res.data.data.user.deptName = res.data.data.deptName
                mpvue.setStorageSync({
                  key: 'role',
                  data: role
                })
                mpvue.setStorageSync({
                  key: 'userInfo',
                  data: res.data.data.user
                })
                mpvue.switchTab({url: '../homeAuth/main'})
                } else {
                  mpvue.alert({content: res.data.message, buttonText: '确定'})
                }
            },
              fail: function (res) {
                mpvue.alert({content: JSON.stringify(res)})
            },
              complete: function (res) {
                // mpvue.alert({content: 'complete'})
            }
            })
        }
        })
     }
    },
    onLoad (option) {
      if (option.warnId) {
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
                let userInfo = res.data.data.user
                mpvue.setStorageSync({
                  key: 'userInfo',
                  data: userInfo
                })
                mpvue.navigateTo({
                  url: '../homeAlertMap/main?warnId=' + option.warnId
                })
              }
            })
          }
        })
      } else {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        if (userInfo != null) {
          mpvue.switchTab({url: '../homeAuth/main'})
      }
     }
    }
  }
</script>
<style lang="less" scoped>
  .outer_label {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 350rpx;
    /*background-color: #000099;*/
    text-align: center;
    filter: brightness(1.4);
  }
  .inner_label {
    position: absolute;
    left:0;
    right: 0;
    bottom: 0;
    top:0;
    margin: auto;
    height: 50px;
    width: 100%;
  }
  .qxs-icon {
    height: 40px;
    width: 90%;
    margin-bottom: 5px;
    padding-left: 10%;
    border: 0;
    border-bottom: solid 1px lavender;
  }

  .login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
  }
  .qxs-ic_user {
    /*background: url("../../assets/login/ic_user.png") no-repeat;*/
    background-size: 13px 15px;
    background-position: 3%;
  }
  .qxs-ic_password {
    /*background: url("../../assets/login/ic_password.png") no-repeat;*/
    background-size: 13px 15px;
    background-position: 3%;
    margin-bottom: 20px;
  }
  .login_logo {
    height: 100%;
  }
  .login_btn {
    width: 100%;
    font-size: 16px;
    color: white;
    background: #117fe1;
    filter: brightness(1.4);
  }
</style>
