<template>
  <div class="content">
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
          infoWhole: null,
          infoList: {
            'no-title': [{
              type: 'KEY_VALUE',
              key: '隐患名称',
              value: ''
            }, {
              type: 'KEY_VALUE',
              key: '隐患类型',
              value: ''
            }, {
              type: 'KEY_VALUE',
              key: '隐患部位',
              value: ''
            }, {
              type: 'TEXTAREA_PLAIN',
              key: '隐患描述',
              disabled: true
            }],
            '照片': [{
              type: 'IMAGE_PLAIN',
              url: ''
            }],
            ' ': [{
              type: 'BUTTON_PLAIN',
              text: '处理',
              style: 'full',
              callBack: this.handleDealClick
            }]
          }
        }
      }
    },
    onLoad (options) {
      this.pageData.infoWhole = JSON.parse(options.item)
      console.log(this.pageData.infoWhole)
      this.pageData.infoList['no-title'][0].value = this.pageData.infoWhole.hiddangerName || ''
      this.pageData.infoList['no-title'][1].value = this.pageData.infoWhole.type || ''
      this.pageData.infoList['no-title'][2].value = this.pageData.infoWhole.place || ''
      this.pageData.infoList['no-title'][3].value = this.pageData.infoWhole.hiddenDescript || ''
      this.pageData.infoList['照片'][0].url = this.pageData.infoWhole.livePhoto ? `http://120.55.234.38/api/getPicture?picture=${this.pageData.infoWhole.livePhoto}` : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567848143512&di=7bd79056e926ad17f296e8c58e00e901&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180118%2Fa0163c6be9d247918669229bed6c7280.png'
      let role = mpvue.getStorageSync({key: 'role'}).data
      if (role === 'gwh') {
        this.pageData.infoList[' '] = {}
      }
    },
    created () {},
    methods: {
      handleDealClick () {
        if (this.pageData.infoWhole.workOrderStates === '4') {
          mpvue.alert({content: '该隐患已处理', buttonText: '确定'})
          return false
        }
        mpvue.redirectTo({
          url: `../homeProblemDetailDeal/main?id=${this.pageData.infoWhole.id}`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    overflow: auto;
    .gray-background;
  }
</style>
