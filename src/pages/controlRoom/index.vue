<template>
  <div class="content">
    <div style="height:80rpx;border-bottom: #bcbcbc;border-bottom-style: solid;border-bottom-width: 0.5rpx;" v-for="item in pageData.roomList" :key="item.id" @click="handleRoomItemClick(item.id)">
      <div style="padding: 20rpx;">{{item.address}}<span style="float:right;margin-top:-10rpx;"> &#155;	 </span></div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageData: {
          roomList: []
        }
      }
    },
    components: {
    },
    computed: {},
    methods: {
      async getFlashPager () {
        const userInfo = mpvue.getStorageSync({key: 'userInfo'}).data
        this.pageData.roomList = (await this.$request('/miniFireStation/selectFireRoomByDeptId', 'POST', {
          deptId: userInfo.deptId
        })).data.data
      },
      async handleRoomItemClick (id) {
        const res = (await this.$request('/smallScreen/controlRoom/getLiveData', 'GET', {
          id: id,
          type: 'smallScreen'
        })).data
        if (res.code === 200) {
          mpvue.navigateTo({
            url: '../video/main?videoUrl=' + encodeURI(res.data.data.url)
          })
        } else {
          mpvue.alert({content: res.message, buttonText: '确定'})
        }
      }
    },
    mounted () {
    },
    onLoad () {
      this.getFlashPager()
    }
  }
</script>

<style lang="less" scoped>
  .content {
  }
</style>
