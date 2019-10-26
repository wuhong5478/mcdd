<template>
  <div class="content">
    <div class="content-reason">
      {{config.reason}}
    </div>
    <div class="content-address">
      {{config.address}}
    </div>
    <div class="content-create">
      {{config.createTime}}
    </div>
    <div class="content-device">
      {{config.device}}
    </div>
    <div class="content-terminal">
      {{config.terminal}}
    </div>
    <div class="content-update">
      {{config.updateTime}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      config: Object
    },
    data () {
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .content {
    margin: 24rpx;
    .padding-normal();
    .border-radius-normal();
    .white-background();
    .content-reason {
      .font-large-bold();
      color: @color-text-main;
      &::before {
        content: '报警原因：';
      }
    }
    .content-address {
      .font-large-bold();
      color: rgb(8, 4, 4);
      &::before {
        content: '设备地址：';
      }
    }
    .content-create {
      .font-large();
      color: @color-text-minor;
      &::before {
        content: '报警时间：';
        color: rgb(49, 28, 28);
      }
    }
    .content-device {
      .font-large();
      color: @color-text-minor;
      &::before {
        content: '报警时间：';
        color: @color-text-main;
      }
    }
    .content-terminal {
      .font-large();
      color: @color-text-minor;
      &::before {
        content: '终端编号：';
        color: @color-text-main;
      }
    }
    .content-update {
      .font-large();
      color: @color-text-minor;
      &::before {
        content: '处理时间：';
        color: @color-text-main;
      }
    }
  }
</style>
