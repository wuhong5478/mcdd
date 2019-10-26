<template>
  <div class="content">
    <div class="content-phones">
      <div class="content-phones-group" v-for="(item, key) in pageData.userList" :key="key">
        <div class="content-phones-group-name">{{key}}</div>
        <div class="content-phones-group-list">
          <div class="content-phones-group-list-item" v-for="(innerItem, innerIndex) in item" :key="innerIndex" :style="{ 'border-bottom': (innerIndex + 1) === item.length ? '' : '1rpx solid rgba(238,238,238,1)' }">
            <user-card :config="innerItem"></user-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commonCard from '@/components/commonCard'
  import userCard from '@/components/userCard'
  import utils from '@/utils'

  export default {
    data () {
      return {
        pageData: {
          userList: {}
        }
      }
    },
    components: {
      commonCard,
      userCard
    },
    computed: {},
    onShow () {
      this.getUserList()
    },
    methods: {
      async getUserList () {
        const tempUserList = (await this.$request('/sysuser/getuserinfolist', 'GET', {
          pageNo: -1,
          pageSize: 1000
        })).data.data.rows.map(item => ({
          head: '/static/images/user/head.png',
          name: item.name,
          comp: item.deptName,
          phone: item.phone,
          key: utils.getPy(item.name.substr(0, 1))[0],
          dingcount: item.dingcount,
          deptName: item.deptName
        }))
        let keySet = new Set()
        for (let i = 0; i < tempUserList.length; i++) {
          keySet.add(tempUserList[i].key)
        }
        this.pageData.userList = {}
        let that = this
        keySet.forEach(function (element, sameElement, set) {
            let tempUserArr = []
            for (let i = 0; i < tempUserList.length; i++) {
              if (element === tempUserList[i].key) {
                tempUserArr.push(tempUserList[i])
              }
            }
          that.pageData.userList[element] = tempUserArr
        })
        this.$forceUpdate()
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    .content-cards {
      .content-cards-scroll {
        .flex-row();
        .content-cards-scroll-item {}
      }
    }
    .content-phones {
      .padding-normal();
      .content-phones-group {
        .content-phones-group-name {
          padding: 20rpx 0;
          .font-large-bold();
          color: @color-text-main;
        }
        .content-phones-group-list {
          .white-background();
          .box-shadow-large();
          .border-radius-large();
          .content-phones-group-list-item {
          }
        }
      }
    }
  }
</style>
