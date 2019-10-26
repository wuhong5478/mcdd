<template>
	<div class="content">
		<div class="content-menu" v-for="(item, index) in itemText" :key="index" v-if="!isFlash && type === 'menu'">
			<div class="content-menu-item" @click="handleTabChoosed(index)" :style="{ fontSize: fontSize + 'rpx', color: index === currentIndex.data ? '#409EFF' : '' } ">
				{{item}}
			</div>
			<div class="content-menu-list" v-if="!isFlash && itemList && index === currentIndex.data">
				<div class="content-menu-list-item" v-for="(iitem, iindex) in itemList[index]" :key="iitem" @click="handleItemChoosed(iitem)">{{iitem}}</div>
			</div>
		</div>
		<div class="content-selecter" v-for="(item, index) in itemText" :key="index" v-if="!isFlash && type === 'selector'">
			<div class="content-selecter-item" @click="handleTabChoosed(index)">
				<span :class="index === currentIndex.data ? 'content-selecter-item-text-active' : 'content-selecter-item-text-normal'" :style="{ fontSize: fontSize + 'rpx' } ">
														{{ item }}
													</span>
				<span class="content-selecter-item-line" v-if="index === currentIndex.data"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			fontSize: {
				type: Number,
				required: false,
				default: 28
			},
			type: {
				type: String,
				default: 'selector'
			},
			itemText: Array,
			itemList: Array,
			currentIndex: {
				type: Object,
				required: false,
				default: {
					data: 0
				}
			}
		},
		data () {
			return {
				isFlash: false,
				isMenuOpne: false
			}
		},
		watch: {
			currentIndex: {
				handler () {
					/*
					console.log('我日你妈d', this)
					this.$parent.$mp.page.setData({
						'$root[0].currentIndex': JSON.parse(JSON.stringify(this.currentIndex))
					})
					/* this.isFlash = true
					this.$nextTick(() => {
						this.isFlash = false
					}) */
					/* this.$parent.$mp.page.setData({
						'$root["0_0"].isFlash': true
					})
					setTimeout(() => {
						this.$parent.$mp.page.setData({
							'$root["0_0"].isFlash': false
						})
						console.log('我诶集', this)
						this.$forceUpdate()
					}, 500) */
				},
				deep: true
			}
		},
		methods: {
			handleTabChoosed (index) {
				if (this.type === 'menu') {
					if (this.currentIndex.data === index) {
						this.currentIndex.data = new Date().valueOf()
						return
					}
				}
				this.currentIndex.data = index
			},
			handleItemChoosed (item) {
				this.itemText.splice(this.currentIndex.data, 1, item)
				this.currentIndex.data = new Date().valueOf()
			},
			forceUpdateFather () {
				this.$set(this.currentIndex, 'update', 1)
				delete (this.currentIndex.update)
			}
		},
		mounted () {}
	}
</script>

<style lang="less" scoped>
	.content {
		height: 44px;
		width: 100vw;
		position: relative;
		.flex-row(center);
		.white-background();
		border-top: 1px solid #f2f2f2;
		border-bottom: 1px solid #f2f2f2;
		text-align: center;
		z-index: 9999;
		.font-small();
		.content-selecter {
			width: 50%;
			height: 44px;
			.content-selecter-item {
				.flex-column(center, flex-start);
				height: 44px;
				color: @color-text-normal;
				.content-selecter-item-text-normal {
					margin-top: 10px;
					margin-bottom: 8px;
				}
				.content-selecter-item-line {
					width: 27px;
					height: 1px;
					border: 3rpx solid @color-main;
					background-color: @color-main;
					.border-radius-large();
				}
				.content-selecter-item-text-active {
					margin-top: 10px;
					margin-bottom: 8px;
					color: #333333;
					font-weight: bold;
				}
			}
		}
		.content-menu {
			flex: 1;
			height: 44px;
			.content-menu-item {
				.flex-row(center, center);
				height: 44px;
				color: rgba(153, 153, 153, 1);
				&::after {
					content: ' ';
					display: inline-block;
					width: 26rpx;
					height: 26rpx;
					margin: 5rpx;
					background-size: 100% 100%;
					background-image: url('/static/images/common/arrow_gray_icon.png')
				}
			}
			.content-menu-list {
				.font-large();
				position: absolute;
				color: rgba(153, 153, 153, 1);
				left: 0;
				width: 100vw;
				background: white;
				display: flex;
				flex-direction: column;
				.animation-down();
				.content-menu-list-item {
					border-top: 1rpx solid rgba(242, 242, 242, 1);
					margin: 0 40rpx;
					padding: 30rpx 0;
				}
			}
		}
	}
</style>
