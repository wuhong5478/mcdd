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
        pageConfig: {},
        pageData: {
          infoWhole: null,
          parkName: null,
          infoList: {
            'no-title': [{
              type: 'INPUT_PLAIN',
              key: '隐患名称',
              value: ''
            }, {
              type: 'SELECTOR_PLAIN',
              key: '隐患等级',
              list: ['重大', '一般'],
              value: '请选择'
            }, {
              type: 'INPUT_PLAIN',
              key: '隐患部位',
              value: ''
            }, {
              type: 'TEXTAREA_PLAIN',
              key: '隐患描述',
              value: ''
            }],
            '上传照片': [{
              type: 'BUTTON_CHOOSEIMG'
            }, {
              type: 'BUTTON_PLAIN',
              text: '提交',
              style: 'full',
              callBack: this.handleUploadClick
            }]
          }
        }
      }
    },
    async onLoad (options) {
      this.pageData.infoWhole = JSON.parse(options.item)
      this.pageData.parkName = (await this.$request('/area/selectAreaById', 'POST', {
        areaId: this.pageData.infoWhole.parkId
      })).data.data.areaName || '鹏辉产业园'
      // dep => console.log('fuck', this.pageData.parkName)
    },
    created () {},
    methods: {
      handleUploadClick () {
        mpvue.getLocation({
          success: res => {
            const levalConfig = ['', '特级重大', '重大', '较大', '一般']
            let formData = {
              deviceName: this.pageData.infoWhole.qrcodeName,
              latitude: res.latitude,
              longitude: res.longitude,
              parkName: this.pageData.parkName,
              propertyName: 'mp-mock',
              userName: 'mp-mock',
              warningAddress: this.pageData.infoWhole.installAddress,
              warningDescription: this.pageData.infoList['no-title'][3].value,
              warningLevel: levalConfig.indexOf(this.pageData.infoList['no-title'][1].value)
            }
            // dep => console.log('formData', formData)
            mpvue.uploadFile({
              url: 'http://120.55.234.38/api/PatrolInspection/reportWarning',
              fileType: 'image',
              fileName: 'file',
              filePath: this.pageData.infoList['上传照片'][0].value[0],
              formData,
              success: (res) => {
                // dep => console.log(res)
                mpvue.navigateBack()
              },
              fail: (e) => {
                // dep => console.log(e)
              }
            })
          },
          fail (e) {
            mpvue.alert({
              title: '定位失败'
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
    overflow: auto;
    .gray-background;
  }
</style>
