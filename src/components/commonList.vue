<template>
    <div class="content" v-if="!flashing">
        <div class="content-group" v-for="(value, key, index) in listData" :key="key">
            <div class="content-group-head" v-if="key !== 'no-title' && value[0]">{{key}}
                <div class="content-group-head-sub" v-if="listData[key + '-sub-title']">{{listData[key + '-sub-title']}}</div>
            </div>
            <div class="content-group-item" v-for="(innerValue, innerIndex) in value" :key="innerValue.updateTime">
                <!-- 静态文本框 -->
                <div class="content-group-item-text" v-if="innerValue.type === 'TEXT_PLAIN'">
                    <div class="content-group-item-text-text">{{innerValue.text}}:</div>
                </div>
                <!-- 静态图片框 -->
                <div class="content-group-item-img" v-if="innerValue.type === 'IMAGE_PLAIN'">
                    <img :src="innerValue.url">
                </div>
                <!-- 静态键值框 -->
                <div class="content-group-item-keyv" v-if="innerValue.type === 'KEY_VALUE'">
                    <div class="content-group-item-keyv-key">{{innerValue.key}}:</div>
                    <div class="content-group-item-keyv-value">{{innerValue.value}}</div>
                </div>
                <!-- 键值输入框 -->
                <div class="content-group-item-input" v-if="innerValue.type === 'INPUT_PLAIN'">
                    <div class="content-group-item-input-key">{{innerValue.key}}:</div>
                    <div class="content-group-item-input-value">
                        <input placeholder-class="content-group-item-input-value-plc" v-model="innerValue.value">
                    </div>
                </div>
                <!-- 键值选择框 -->
                <div class="content-group-item-select" v-if="innerValue.type === 'SELECTOR_PLAIN'">
                    <div class="content-group-item-select-key">{{innerValue.key}}:</div>
                    <div class="content-group-item-select-value">
                        <picker :value="innerValue.index" @change="handlePickerChange($event, innerValue)" :range="innerValue.list" :disabled="!(innerValue.list.length > 0)">
                            <div class="picker">
                                {{innerValue.value || (innerValue.list.length > 0 ? '请选择' : '暂无可选项')}}
                            </div>
                        </picker>
                    </div>
                    <div class="content-group-item-select-icon">
                        <img src="/static/images/common/more_gray_icon.png">
                    </div>
                </div>
                <!-- 键值多行输入框 -->
                <div class="content-group-item-textarea" v-if="innerValue.type === 'TEXTAREA_PLAIN'">
                    <div class="content-group-item-textarea-key" v-if="innerValue.key">{{innerValue.key}}:</div>
                    <div class="content-group-item-textarea-main">
                        <textarea auto-height placeholder="请在此处输入内容" :disabled="innerValue.disabled" v-model="innerValue.value" :show-count="false" />
                    </div>
                </div>
                <!-- 跳转按钮 -->
                <div class="content-group-item-jump" v-if="innerValue.type === 'BUTTON_JUMP'" @click="innerValue.callBack">
                    <div class="content-group-item-jump-key">{{innerValue.key}}</div>
                    <div class="content-group-item-jump-icon">
                        <img src="/static/images/common/more_gray_icon.png">
                    </div>
                </div>
                <!-- 上传图片按钮 -->
                <div class="content-group-item-chooseimg" :key="innerValue.updateTime" v-if="innerValue.type === 'BUTTON_CHOOSEIMG'" @click="handleItemClick(key, innerIndex)" :style="{ padding: innerValue.value ? '0px' : '' }">
                    <div class="content-group-item-chooseimg-main" v-if="!innerValue.value" :key="innerValue.updateTime">
                        <img src="/static/images/common/photo_gray_icon.png">
                    </div>
                    <div class="content-group-item-chooseimg-text" v-if="!innerValue.value" :key="innerValue.updateTime">
                        {{innerValue.text || '(上传隐患设备照片)'}}
                    </div>
                    <div class="content-group-item-chooseimg-img" v-if="innerValue.value" :key="innerValue.updateTime">
                        <img :src="innerValue.value[0]" mode="widthFix" :key="innerValue.updateTime">
                    </div>
                </div>
                <!-- 单选按钮 -->
                <div class="content-group-item-answer" v-if="innerValue.type === 'BUTTON_ANSWER'" :style="{ 'background': innerValue.data ? '@color-main' : '@color-text-minor' }" @click="handleItemClick(key, innerIndex)">
                    <div class="content-group-item-answer-text">{{innerValue.text}}</div>
                </div>
                <!-- 通用按钮 -->
                <div v-if="innerValue.type === 'BUTTON_PLAIN'">
                    <div class="content-group-item-button" v-if="innerValue.style === 'full'" :style="{ color: 'white', background: '#108ee9' }" @click="innerValue.callBack">
                        <div class="content-group-item-button-text">{{innerValue.text}}</div>
                    </div>
                    <div class="content-group-item-button" v-else @click="innerValue.callBack">
                        <div class="content-group-item-button-text" :style="{ color: '#108ee9' }">{{innerValue.text}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*
        import {
            mapActions,
            mapState,
            mapMutations,
            mapGetters
        } from 'vuex' */
    export default {
        components: {},
        props: {
            listData: {
                type: Object,
                required: true
            }
        },
        created () {},
        mounted () {
            for (let key in this.listData) {
                this.listData[key].forEach(item => {
                    this.updateTime(item)
                })
            }
            this.forceUpdateFather()
            // this.listData = JSON.parse(JSON.stringify(this.listData))
        },
        updated () {
            // dep => console.log('重新渲染')
        },
        data () {
            return {
                flashing: false
            }
        },
        computed: {},
        methods: {
            updateTime (item) {
                item.updateTime = Math.round(Math.random() * 1000000)
                console.log('updateTime', item.updateTime)
            },
            handlePickerChange (e, item) {
                // dep => console.log('$event: ', e)
                item.value = item.list[e.mp.detail.value]
                // this.updateTime(item) 出你妈大问题
                // dep => console.log('$res: ', item.value)
                item.index = e.mp.detail.value
                this.$emit('pick', item.value)
                this.forceUpdateFather()
            },
            async handleItemClick (key, index) {
                // 确定被点击的行与组
                const activeGroup = this.listData[key]
                const activeItem = this.listData[key][index]
                switch (activeItem.type) {
                    case 'BUTTON_ANSWER':
                        // 当选择一个未选择的选项
                        // dep => console.log('hahha', this.listData)
                        if (!activeItem.data) {
                            activeGroup.filter(item => item.type === 'BUTTON_ANSWER').forEach(item => {
                                item.data = false
                            })
                        }
                        // dep => console.log('hahha', this.listData)
                        // 反选选项
                        activeItem.data = !activeItem.data
                        // dep => console.log('hahha', this.listData)
                        break
                    case 'BUTTON_CHOOSEIMG':
                        let res = await this.$util.chooseImage({
                            sourceType: ['camera', 'album'],
                            count: 1
                        })
                        if (res.filePaths.length > 0) activeItem.value = res.filePaths
                        // dep => console.log('选取图片', res.filePaths)
                        break
                }
                this.$forceUpdate()
              console.log(this.listData)
                this.forceUpdateFather()
            },
            forceUpdateFather () {
                // this.$set(this.listData, 'update', 1)
                // delete (this.listData.update)
                // console.log('通用组件', this)
                // this.$parent.$mp.page.setData({
                //     '$root[0].pageData': JSON.parse(JSON.stringify(this.listData))
                //  })
                setTimeout(() => {
                    this.flashing = true
                    this.$nextTick(() => {
                        this.flashing = false
                    })
                }, 50)
            }
        }
    }
</script>

<style lang="less" scoped>
    .content {
        width: 100vw;
        border-top: 1px solid #f2f2f2;
        font-size: 14px;
        color: @color-text-normal;
        .white-background();
        .content-group {
            .content-group-head {
                .gray-background;
                .padding-normal();
                .flex-row(@AI: flex-end);
                color: @color-text-minor;
            }
            .content-group-item {
                .border-bottom();
                .content-group-item-text {
                    .padding-normal();
                    .content-group-item-text-text {}
                }
                .content-group-item-img {
                    padding: 20rpx;
                    img {
                        width: 100%;
                    }
                }
                .content-group-item-keyv {
                    .flex-row(center);
                    padding: 30rpx 20rpx;
                    .content-group-item-keyv-key {
                        flex: 2
                    }
                    .content-group-item-keyv-value {
                        color: @color-text-holder;
                        flex: 7;
                    }
                }
                .content-group-item-textarea {
                    .padding-normal();
                    .content-group-item-textarea-key {}
                    .content-group-item-textarea-main {
                        margin: 30rpx 0;
                        .gray-background;
                        .border-radius-normal();
                        textarea {
                            .padding-normal();
                            .gray-background;
                            color: @color-text-holder;
                            .font-medium();
                        }
                    }
                }
                .content-group-item-select {
                    .flex-row(center);
                    padding: 22rpx 20rpx;
                    .content-group-item-select-key {
                        flex: 2
                    }
                    .content-group-item-select-value {
                        flex: 7;
                        color: @color-text-holder;
                        input {
                            color: @color-text-holder;
                            .font-medium();
                        }
                    }
                    .content-group-item-select-icon {
                        img {
                            height: 40rpx;
                            width: 40rpx;
                        }
                    }
                }
                .content-group-item-input {
                    .flex-row(center);
                    .padding-normal();
                    .content-group-item-input-key {
                        flex: 2
                    }
                    .content-group-item-input-value {
                        flex: 7;
                        input {
                            height: 38rpx;
                            color: @color-text-holder;
                            .font-medium();
                        }
                    }
                }
                .content-group-item-jump {
                    .flex-row(center);
                    .content-group-item-jump-key {
                        .padding-normal();
                        flex: 1
                    }
                    .content-group-item-jump-icon {
                        .padding-normal();
                        img {
                            height: 40rpx;
                            width: 40rpx;
                        }
                    }
                }
                .content-group-item-answer {
                    .padding-normal();
                    margin: 24rpx;
                    opacity: 0.5;
                    color: white;
                    .content-group-item-answer-text {}
                }
                .content-group-item-chooseimg {
                    .flex-column(center);
                    padding: 44rpx 24rpx 24rpx 24rpx;
                    /*
                                    &::after {
                                        content: '(上传隐患设备照片)';
                                        display: block;
                                        .padding-normal();
                                        color: @color-text-holder;
                                        .font-medium();
                                    }
                                    */
                    .content-group-item-chooseimg-main {
                        .flex-row(center, center);
                        height: 100rpx;
                        width: 100rpx;
                        .border-radius-large();
                        border: 4rpx solid rgba(242, 242, 242, 1);
                        img {
                            height: 50rpx;
                            width: 50rpx;
                        }
                    }
                    .content-group-item-chooseimg-text {
                        .padding-normal();
                        color: @color-text-holder;
                        .font-medium();
                    }
                    .content-group-item-chooseimg-img {
                        padding: 0;
                    }
                }
                .content-group-item-button {
                    .content-group-item-button-text {
                        height: 48px;
                        line-height: 48px;
                        text-align: center;
                    }
                }
            }
        }
    }
</style>
