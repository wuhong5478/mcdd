<!--{ GCommonDialog.vue => G-CD }-->
<template>
    <div class="C-CD-container" v-if="isDestroy === false" @click="handleCancelClick" :style="{'opacity': alpha ? alpha + '' : '1'}">
        <div class="C-CD-container-normal">
            <div class="C-CD-container-normal-title">
                {{getTitle}}
            </div>
            <div class="C-CD-container-normal-text">
                {{gDialogObject.content}}
            </div>
            <div class="C-CD-container-normal-console" v-if="!gDialogObject.btns">
                <button class="C-CD-container-normal-console-confirm" v-if="gDialogObject.success === 'share'" open-type="share">好的</button>
                <div class="C-CD-container-normal-console-confirm" @click.stop="handleConfirmClick" v-else>确定</div>
                <div class="C-CD-container-normal-console-cancel" @click.stop="handleCancelClick" v-if="gDialogObject.showCancel">取消</div>
            </div>
            <div class="C-CD-container-normal-console" v-else>
                <div class="C-CD-container-normal-console-confirm" @click.stop="handleConfirmClick">{{gDialogObject.btns[0]}}</div>
                <div class="C-CD-container-normal-console-cancel" @click.stop="handleCancelClick" v-if="gDialogObject.showCancel">{{gDialogObject.btns[1]}}</div>
            </div>
        </div>
        {{listengDialogObject}}
    </div>
</template>

<script>
    import {
        mapActions,
        mapState,
        mapGetters,
        mapMutations
    } from 'vuex'
    export default {
        props: {},
        data() {
            return {
                isDestroy: true,
                alpha: null,
                intervalId: {}
            }
        },
        created() {},
        mounted() {},
        onUnload() {
            this.$dialog()
        },
        onShow() {
            // dep => // dep => console.log('dialog onshow')
        },
        onHidden() {
            // dep => // dep => console.log('dialog onhidden')
        },
        onLoad() {
            // dep => // dep => console.log('dialog onload')
        },
        methods: {
            handleCancelClick() {
                this.gDialogObject.success({
                    cancel: true
                })
                this.alpha = 1
                this.intervalId = setInterval(() => {
                    if (this.alpha === null) return
                    this.alpha -= 0.1
                    if (this.alpha < 0) {
                        this.isDestroy = true
                        this.alpha = null
                        clearInterval(this.intervalId)
                        this.$dialog()
                    }
                }, 40)
            },
            handleConfirmClick() {
                this.gDialogObject.success({
                    confirm: true
                })
                this.alpha = 1
                this.intervalId = setInterval(() => {
                    if (this.alpha === null) return
                    this.alpha -= 0.1
                    if (this.alpha < 0) {
                        this.isDestroy = true
                        this.alpha = null
                        clearInterval(this.intervalId)
                        this.$dialog()
                    }
                }, 40)
            }
        },
        watch: {
            gDialogObject: {
                handler: function(newVal, oldVal) {
    
                    if (this.gDialogObject.title !== '默认标题') this.isDestroy = false
                    else this.isDestroy = true
                    // dep => console.log('销毁')
                    // dep => // dep => console.log('watch监听到了', this.isDestroy)
                },
                deep: true
            }
        },
        computed: {
            ...mapState('gView', ['gDialogObject']),
            /*
            listengDialogObject() {
                // dep => // dep => console.log('监听到了', this.gDialogObject)
                if (this.gDialogObject.title !== '默认标题') this.isDestroy = false
                else this.isDestroy = true
            },
            */
            getTitle() {
                if (this.gDialogObject) return this.gDialogObject.title.split('?')[0]
            }
        }
    }
</script>

<style lang="less" scoped>
    @keyframes dialogShow {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
    .C-CD-container {
        position: fixed;
        animation: dialogShow 0.8s;
        top: 0;
        left: 0;
        z-index: 9999;
        width: 100vw;
        height: 100vh;
        background: rgba(92, 92, 92, 0.80);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .C-CD-container-normal {
            width: 80vw;
            padding: 20px;
            line-height: 25px;
            border-radius: 8px;
            text-align: left;
            background: white;
            overflow: hidden;
            .C-CD-container-normal-title {
                padding: 12px;
                font-family: PingFangSC-Medium;
                font-size: 24px;
                color: #333333;
                letter-spacing: 0.02px;
            }
            .C-CD-container-normal-text {
                padding: 10px 12px 25px 12px;
                font-size: 14px;
                font-family: PingFangSC-Medium;
                color: #999999;
                letter-spacing: 0.02px;
            }
            .C-CD-container-normal-console {
                display: flex;
                flex-direction: column;
                .C-CD-container-normal-console-cancel {
                    border-radius: 6px;
                    font-size: 14px;
                    line-height: 40px;
                    color: #FFC400;
                    text-align: center;
                    border: 1px solid #FFC400;
                }
                .C-CD-container-normal-console-confirm {
                    width: 100%;
                    border-radius: 6px;
                    font-size: 14px;
                    line-height: 40px;
                    color: white;
                    text-align: center;
                    background: #FFC400;
                    margin-bottom: 20px;
                    border: 1px solid #FFC400;
                }
            }
        }
    }
</style>