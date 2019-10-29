<template>
  <div class="content">
    <common-list :listData="pageData.infoList" @pick="handlePickItem"></common-list>
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
          areaList: null,
          currentAreaId: null,
          buildList: null,
          currentBuildId: null,
          infoList: {
            '地址信息': [{
              type: 'SELECTOR_PLAIN',
              key: '园区',
              list: ['园区1', '园区2', '园区3', '园区4'],
              value: ''
            }, {
              type: 'SELECTOR_PLAIN',
              key: '建筑',
              list: ['建筑1', '建筑2', '建筑3', '建筑4'],
              value: ''
            }, {
              type: 'INPUT_PLAIN',
              key: '详细地址',
              value: ''
            }],
            '隐患信息': [{
              type: 'SELECTOR_PLAIN',
              key: '隐患等级',
              list: ['特级重大', '重大', '较大', '一般'],
              value: ''
            }, {
              type: 'INPUT_PLAIN',
              key: '隐患名称',
              value: ''
            }],
            '上传照片': [{
              type: 'BUTTON_CHOOSEIMG'
            }],
            '隐患描述': [{
              type: 'TEXTAREA_PLAIN',
              key: '',
              value: ''
            }, {
              type: 'BUTTON_PLAIN',
              text: '提交',
              callBack: this.handleDealClick,
              style: 'full'
            }]
          }
        }
      }
    },
    async mounted () {
      this.pageData.areaList = (await this.$request('/architecture/selectAllArea', 'POST')).data.data
      this.pageData.infoList['地址信息'][0].list = this.pageData.areaList.map(item => item.areaName)
    },
    created () {},
    methods: {
      async handlePickItem (pick) {
        let res = this.pageData.areaList.filter(item => item.areaName === pick)[0] || this.pageData.buildList.filter(item => item.architectureName === pick)[0]
        if (res.areaName) {
          this.pageData.currentAreaId = res.areaId
          this.pageData.currentBuildId = null
          this.pageData.infoList['地址信息'][1].value = ''
          this.pageData.buildList = (await this.$request('/architecture/selectByAreaId', 'POST', {
            areaId: res.areaId
          })).data.data
          this.pageData.infoList['地址信息'][1].list = this.pageData.buildList.map(item => item.architectureName)
        } else {
          this.pageData.currentBuildId = res.id
        }
      },
      handleDealClick () {
        const levalConfig = ['', '特级重大', '重大', '较大', '一般']
        mpvue.uploadFile({
          url: 'http://118.31.247.145:8088/taskwarn/addtaskwarn',
          fileType: 'image',
          fileName: 'file',
          filePath: this.pageData.infoList['上传照片'][0].value[0],
          formData: {
            park: this.pageData.currentAreaId,
            place: this.pageData.infoList['地址信息'][2].value,
            level: levalConfig.indexOf(this.pageData.infoList['隐患信息'][0].value),
            hiddangerName: this.pageData.infoList['隐患信息'][1].value,
            hiddenDescript: this.pageData.infoList['隐患描述'][0].value
          },
          success: (res) => {
            // dep => console.log(res)
            mpvue.navigateBack()
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
