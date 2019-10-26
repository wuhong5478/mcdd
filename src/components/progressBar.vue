<template>
	<div>
		<div class="content" v-if="bingo === 'yunxi'">
			<div class="content-main" :style="{ height: '10rpx', 'border-radius': '5rpx' }">
				<div class="content-main-left" :style="{ flex: finish, background: '#117FE1' }">
				</div>
				<div class="content-main-right" :style="{ flex: (total - finish) }"></div>
			</div>
		</div>
	
		<div class="content" v-else>
			<div class="content-main">
				<div class="content-main-left" :style="{ flex: finish }">
					<div class="content-main-left-point"></div>
				</div>
				<div class="content-main-right" :style="{ flex: (total - finish) }"></div>
			</div>
			<div class="content-count">
				<div class="content-count-finish">{{finish}}</div>
				<div class="content-count-total">/{{total}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			total: Number,
			finish: Number,
			bingo: String
		},
		data () {
			return {}
		},
		methods: {},
		mounted () {}
	}
</script>

<style lang="less" scoped>
	.content {
		.flex-row(center);
		.white-background();
		padding: 20rpx 15rpx;
		.content-main {
			.flex-row();
			flex: 1;
			height: 20rpx;
			.border-radius-large();
			.content-main-left {
				.flex-row(center, flex-end);
				background: linear-gradient(90deg, rgba(255, 230, 91, 1), rgba(255, 197, 0, 1));
				.border-radius-large();
				.content-main-left-point {
					width: 40rpx;
					height: 40rpx;
					.border-radius-circle();
					margin-right: 1.5rpx;
					border: 10rpx solid rgba(255, 197, 0, 0.6);
					.white-background();
				}
			}
			.content-main-right {
				background: rgba(236, 236, 236, 1);
				border-top-right-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}
		}
		.content-count {
			.flex-row();
			padding-left: 20rpx;
			.content-count-finish {
				.font-medium-bold();
				color: rgba(12, 12, 12, 1);
				line-height: 11rpx;
			}
			.content-count-total {
				.font-medium-bold();
				color: #B8B8B8;
				line-height: 11rpx;
			}
		}
	}
</style>
