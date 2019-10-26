<template>
  <div class="content">
    <div class="content-top">
      <div class="content-top-head">
        <img :src="pageData.head">
      </div>
      <div class="content-top-name">{{pageData.name}}</div>
      <div class="content-top-info">
        <div class="content-top-info-phone">{{pageData.phone}}</div>
        <div class="content-top-info-dingding">{{pageData.dingcount}}</div>
      </div>
    </div>
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
          name: '',
          phone: '',
          dingcount: '',
          infoList: {
            'no-title': [{
              type: 'INPUT_PLAIN',
              key: '所属机构',
              value: '云栖小镇管委会'
            }, {
              type: 'INPUT_PLAIN',
              key: '所属机构',
              value: '物业人员'
            }]
          }
        }
      }
    },

    created () {},
    onLoad (options) {
      const user = JSON.parse(options.item)
      this.pageData.name = user.name
      this.pageData.phone = user.phone
      this.pageData.head = user.head
      this.pageData.dingcount = user.dingcount
      this.pageData.infoList = {
        'no-title': [{
          type: 'INPUT_PLAIN',
          key: '所属机构',
          value: user.deptName
        }, {
          type: 'INPUT_PLAIN',
          key: '所属机构',
          value: '物业人员'
        }]
      }
    },
    methods: {
      handleEditClick () {
        mpvue.navigateBack()
      }
    }
  }
</script>

<style lang="less" scoped>
  .content {
    height: 100vh;
    overflow: auto;
    .content-top {
      background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(243, 243, 243, 1) 100%);
      .flex-column(center);
      padding: 40rpx;
      .content-top-head {
        height: 216rpx;
        width: 216rpx;
        border-radius: 50%;
        img {
          height: 216rpx;
          width: 216rpx;
          border-radius: 50%;
        }
      }
      .content-top-name {
        padding: 30rpx 0;
        font-size: 32rpx;
        font-weight: 500;
        color: rgba(14, 14, 14, 1);
      }
      .content-top-info {
        font-size: 28rpx;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        .flex-row(center, center);
        .content-top-info-phone {
          &::before {
            content: '电话';
            color: rgba(14, 14, 14, 1);
          }
        }
        .content-top-info-dingding {
          margin-left: 40rpx;
          &::before {
            content: '钉钉';
            color: rgba(14, 14, 14, 1);
          }
        }
      }
    }
  }
</style>
