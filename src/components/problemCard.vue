<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-type">{{config.device}}</div>
      <div class="content-top-status" v-if="statusConfig[config.status]" :style="{ color: statusConfig[config.status].color }">{{statusConfig[config.status].label}}</div>
    </div>
    <div class="content-bottom">
      <div class="content-bottom-address">{{config.address}}</div>
      <div class="content-bottom-level" v-if="levelConfig[config.level]" :style="{ color: levelConfig[config.level].color }">{{levelConfig[config.level].label}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    },
    created () {},
    data () {
      return {
        statusConfig: [{}, {
          label: '未处理',
          color: '#666666'
        }, {
          label: '处理未确认',
          color: '#666666'
        }, {
          label: '处理未达标',
          color: '#666666'
        }, {
          label: '已处理',
          color: '#666666'
        }],
        levelConfig: [{}, {
          label: '特级重大',
          color: '#FC5356'
        }, {
          label: '重大',
          color: '#FC5356'
        }, {
          label: '较大',
          color: '#FC5356'
        }, {
          label: '一般',
          color: '#999999'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .box-shadow-small();
    .border-radius-small();
    .padding-normal();
    background: white;
    .content-top {
      .flex-row(center, space-between);
      .font-large-bold();
      padding-bottom: 20rpx;
      .content-top-type {
        padding: 10rpx 10rpx 10rpx 0;
        .font-medium();
        color:rgba(153,153,153,1);
        &::before {
          content: '隐患类型：';
          font-size: 28rpx;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
      }
      .content-top-status {
        .font-large();
        color: @color-text-normal;
      }
    }
    .content-bottom {
      .flex-row(@JC: space-between);
      .font-medium();
      .content-bottom-address {
        color: rgba(153,153,153,1);
        &::before {
          content: '隐患地址：';
          font-size: 28rpx;
          font-weight: normal;
          color: rgba(51, 51, 51, 1);
        }
      }
      .content-bottom-level {
        white-space: nowrap;
      }
    }
  }
</style>
