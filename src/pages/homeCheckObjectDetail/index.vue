<template>
  <div class="content">
    <common-list :listData="pageData.infoList"></common-list>
    <div class="content-btn">
      <common-button label="上报隐患" :flex="1" bingo="blue" :handler="handleSubmitClick"></common-button>
      <common-button label="正常" :flex="1" bingo="block"></common-button>
    </div>
  </div>
</template>

<script>
  import commonList from '@/components/commonList'
  import commonButton from '@/components/commonButton'
  
  export default {
    components: {
      commonList,
      commonButton
    },
  
    data () {
      return {
        pageConfig: {},
        pageData: {
          infoWhole: null,
          infoList: {
            'no-title': [{
              type: 'INPUT_PLAIN',
              key: '对象名称',
              value: '消火栓'
            }, {
              type: 'INPUT_PLAIN',
              key: '对象地址',
              value: '中大产业园北侧消防通道换行的话就就就'
            }, {
              type: 'INPUT_PLAIN',
              key: '对象设备',
              value: '消防设施'
            }, {
              type: 'INPUT_PLAIN',
              key: '对象时间',
              value: '2018-08-01 16:00:00'
            }]
          }
        }
      }
    },
    onLoad (options) {
      this.pageData.infoWhole = JSON.parse(options.item)
      this.pageData.infoList['no-title'][0].value = this.pageData.infoWhole.qrcodeName
      this.pageData.infoList['no-title'][1].value = this.pageData.infoWhole.installAddress
      this.pageData.infoList['no-title'][3].value = new Date(parseInt(this.pageData.infoWhole.createTime)).toLocaleString().replace(/:\d{1,2}$/, ' ')
    },
    created () {},
    methods: {
      handleSubmitClick () {
        mpvue.navigateTo({
          url: `../homeCheckObjectDetailUpload/main?item=${JSON.stringify(this.pageData.infoWhole)}`
        })
      },
      handleNormalClick () {
  
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    overflow: auto;
    .content-btn {
      .flex-row(center);
      width: 100vw;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
</style>
