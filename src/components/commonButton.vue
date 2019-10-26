<template>
	<div class="content" :style="{ flex }" @click="handler">
		<div class="content-red" v-if="bingo === 'red'">{{label}}</div>
		<div class="content-block" v-if="bingo === 'block'">{{label}}</div>
		<div class="content-blue" v-if="bingo === 'blue'">{{label}}</div>
		<div class="content-normal" v-if="bingo === 'normal'">{{label}}</div>
	</div>
</template>

<script>
	export default {
		props: {
			label: String,
			handler: Function,
			bingo: {
				type: String,
				default: 'normal'
			},
			flex: Number
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
		.flex-row();
		.content-normal {
			padding: 10rpx 30rpx;
			border: 1px solid white;
			.border-radius-normal();
			.font-small-bold();
			color: white;
		}
		.content-block {
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			margin: 20rpx;
			border: 1px solid #1D81DE;
			.border-radius-normal();
			.font-large();
			text-align: center;
			color: #1D81DE;
		}
		.content-blue {
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			margin: 20rpx;
			.border-radius-normal();
			.font-large();
			color: white;
			text-align: center;
			background: #1D81DE;
		}
		.content-red {
			padding: 7rpx 33rpx;
			background: rgba(255, 51, 51, 1);
			opacity: 0.85;
			.border-radius-normal();
			.font-medium-bold();
			color: white;
		}
	}
</style>
