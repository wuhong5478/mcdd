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
          infoList: {
            'no-title': [{
              type: 'INPUT_PLAIN',
              key: '姓名',
              value: '赵武'
            }, {
              type: 'INPUT_PLAIN',
              key: '联系方式',
              value: '13566666981'
            }],
            '  ': [{
              type: 'BUTTON_PLAIN',
              text: '保存编辑',
              callBack: this.handleEditClick
            }]
          }
        }
      }
    },

    created () {},
    methods: {
      async handleFlashPage () {
        const user = mpvue.getStorageSync({key: 'userInfo'}).data
        this.pageData.infoList['no-title'] = [{
          type: 'INPUT_PLAIN',
          key: '姓名',
          value: user.name
        }, {
          type: 'INPUT_PLAIN',
          key: '联系方式',
          value: user.phone
        }]
        this.$forceUpdate()
      },
      async handleEditClick () {
        console.log('handleEditClick')
        let userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        const userId = userInfo.id
        const name = this.pageData.infoList['no-title'][0].value
        const phone = this.pageData.infoList['no-title'][1].value

        const res = (await this.$request('/sysuser/updatesysuser', 'PUT ', {
          userId: userId,
          name: name,
          phone: phone
        })).data
       console.log(res)
        mpvue.navigateBack()
      }
    },
    onShow () {
      this.handleFlashPage()
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    overflow: auto;
    .gray-background();
  }
</style>
