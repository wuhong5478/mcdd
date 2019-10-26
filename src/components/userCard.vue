<template>
  <div class="content" :style="{ background: config.color }" @click="handleContactItemClick(config)">
    <div class="content-head">
      <img :src="config.head">
    </div>
    <div class="content-info">
      <div class="content-info-name">{{config.name}}</div>
      <div class="content-info-comp">{{config.comp}}</div>
    </div>
    <div class="content-call" @click="showCallMenu">
      <img src="/static/images/contact/phone_blue_icon.png">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    },
    methods: {
      showCallMenu () {
        mpvue.showCallMenu({
          phoneNumber: this.config.phone, // 期望拨打的电话号码
        code: '+86', // 国家代号，中国是+86
          showDingCall: true
      })
    },
      handleContactItemClick (item) {
        mpvue.navigateTo({
          url: `../userDetail/main?item=${JSON.stringify(item)}`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .flex-row(center);
    padding: 16rpx 27rpx;
    .content-head {
      height: 70rpx;
      width: 70rpx;
      .border-radius-circle();
      img {
        height: 70rpx;
        width: 70rpx;
      }
    }
    .content-info {
      .flex-column(@JC: space-between);
      flex: 1;
      height: 70rpx;
      margin-left: 47rpx;
      .content-info-name {
        .font-large-bold();
        color: @color-text-main;
      }
      .content-info-comp {
        .font-medium-bold();
        color: @color-text-main;
        opacity: 0.6;
      }
    }
    .content-call {
      img {
        height: 45rpx;
        width: 45rpx;
      }
    }
  }
</style>
