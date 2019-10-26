<template>
  <div class="content">
    <div class="content-nav">
      <common-nav-header :currentIndex="pageStatus.currentNavIndex" :itemText="pageConfig.navList"></common-nav-header>
    </div>
    <div class="content-list">
      <div class="content-list-item" v-for="(item, index) in pageData.checkList" :key="index">
        <check-card :config="item"></check-card>
      </div>
    </div>
    <div class="content-scan" @click="handleScanClick">
      <img src="/static/images/workCheck/scan_white_icon.png">
    </div>
  </div>
</template>

<script>
  import checkCard from '@/components/checkCard'
  import commonNavHeader from '@/components/commonNavHeader'
  
  export default {
    components: {
      checkCard,
      commonNavHeader
    },
  
    data () {
      return {
        pageConfig: {
          navList: ['超时', '未完成', '已完成']
        },
        pageStatus: {
          currentNavIndex: {
            data: 0
          }
        },
        pageData: {
          checkList: [{
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }, {
            title: '云栖小镇A区2号楼消防通道楼梯口',
            address: '云栖小镇A区2号楼'
          }]
        }
      }
    },
  
    created () {},
    methods: {
      handleScanClick () {
        my.scan({
          type: 'qr',
          success: (res) => {
            my.alert({
              title: res.code
            })
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    .gray-background;
    position: relative;
    .content-list {
      height: calc(100% - 100rpx);
      overflow: auto;
    }
    .content-scan {
      .flex-row(center, center);
      height: 100rpx;
      width: 100rpx;
      .border-radius-circle();
      background: @color-main;
      position: absolute;
      bottom: 30rpx;
      right: 30rpx;
      img {
        height: 50rpx;
        width: 50rpx;
      }
    }
  }
</style>
