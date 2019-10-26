<template>
  <div class="content" @click="handleGeneralItemClick(config)">
    <div class="content-no">
      {{config.no}}
    </div>
    <div class="content-name">
      {{config.name}}
    </div>
    <div class="content-score">
      {{config.score}}分
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      handler: Function,
      config: Object
    },
    methods: {
      handleGeneralItemClick (item) {
        mpvue.navigateTo({
          url: `../townGeneral/main?item=${JSON.stringify(item)}`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .flex-row(center, space-between);
    padding: 29rpx 54rpx;
    .white-background();
    .box-shadow-small();
    .border-radius-large();
    .content-no {
      .font-huge-bold();
      color: @color-main;
    }
    .content-name {
      .font-huge-bold();
      color: @color-text-main;
    }
    .content-score {
      .font-huge-bold();
      color: @color-main;
    }
  }
</style>
