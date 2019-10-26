<template>
  <div class="content" v-if="!flashing">
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
        flashing: false,
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
            '现场照片': [{
              type: 'BUTTON_CHOOSEIMG',
              text: '上传现场照片'
            }],
            '报警描述': [{
              type: 'TEXTAREA_PLAIN',
              key: '',
              value: ''
            }, {
              type: 'BUTTON_PLAIN',
              text: '提交',
              callBack: this.handleCreateClick,
              style: 'full'
            }]
          }
        }
      }
    },
    watch: {
      pageData: {
        handler () {
          setTimeout(() => {
            this.flashing = true
            this.$nextTick(() => {
              this.flashing = false
            })
          }, 50)
        },
        deep: true
      }
    },
    async onLoad (options) {
      this.pageData.currentId = options.id
      this.pageData.infoList = {
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
        '现场照片': [{
          type: 'BUTTON_CHOOSEIMG',
          text: '上传现场照片'
        }],
        '报警描述': [{
          type: 'TEXTAREA_PLAIN',
          key: '',
          value: ''
        }, {
          type: 'BUTTON_PLAIN',
          text: '提交',
          callBack: this.handleCreateClick,
          style: 'full'
        }]
      }
      this.pageData.areaList = (await this.$request('/architecture/selectAllArea', 'POST')).data.data
      this.pageData.infoList['地址信息'][0].list = this.pageData.areaList.map(item => item.areaName)
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
      handleCreateClick () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data

        if (this.pageData.currentAreaId == null || this.pageData.currentAreaId.length === 0) {
          mpvue.alert({content: '请选择园区', buttonText: '确定'})
          return false
        }

        if (this.pageData.currentBuildId == null || this.pageData.currentBuildId.length === 0) {
          mpvue.alert({content: '请选择建筑', buttonText: '确定'})
          return false
        }

        if (this.pageData.infoList['地址信息'][2].value.length === 0) {
          mpvue.alert({content: '请输入地址', buttonText: '确定'})
          return false
        }

        if (this.pageData.infoList['现场照片'][0] == null || this.pageData.infoList['现场照片'][0].length === 0) {
          mpvue.alert({content: '请上传图片', buttonText: '确定'})
          return false
        }
        mpvue.uploadFile({
          url: 'http://120.55.234.38/api/fireWarn/sendFire',
          fileType: 'image',
          fileName: 'file',
          filePath: this.pageData.infoList['现场照片'][0].value[0],
          formData: {
            parkId: this.pageData.currentAreaId,
            BuildingId: this.pageData.currentBuildId,
            address: this.pageData.infoList['地址信息'][2].value,
            con: this.pageData.infoList['报警描述'][0].value,
            userId: userInfo.id
          },
          success: (res) => {
            // dep => console.log(res)
            const resData = JSON.parse(res.data)
            if (resData.code === 200) {
              mpvue.showToast({
                type: 'success',
                content: '添加成功',
                duration: 2000,
                success: () => {
                  mpvue.navigateBack()
                }
              })
            }
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
