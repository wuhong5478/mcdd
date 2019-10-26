<template>
  <div class="content">
    <web-view id="web-view-1" :src="pageData.videoSrc" ></web-view>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        pageData: {
          id: '',
          videoSrc: ''
        }
      }
    },
    components: {
    },
    computed: {},
    methods: {
      async getFlashPager () {
        const res = (await this.$request('/smallScreen/controlRoom/getLiveData', 'GET', {
          id: this.pageData.id,
          type: 'smallScreen'
        })).data
        if (res.code === 200) {
             this.pageData.videoSrc = 'https://cloudfire.citylink.hzcloudtown.com/api/video.html?url=' + encodeURI(res.data.data.url)
        } else {
          this.pageData.videoSrc = ''
        }
      }
    },
    mounted () {
    },
    onLoad (option) {
      this.pageData.videoSrc = 'http://assess.zimaotech.com/video.html?url=' + encodeURI(option.videoUrl)
      this.$forceUpdate()
      // this.getFlashPager()
    }
  }
</script>

<style lang="less" scoped>
  .content {
  }
</style>
