<template>
	<view class="sort">
		<uni-nav-bar class="header" backgroundColor="#354E44">
			<view>
			</view>
			<view slot="left" class="left">
				<image src="../../static/icons/message.png" mode=""></image>
			</view>
			<view slot="right" class="right">
				<image src="../../static/icons/search.png" mode=""></image>
				<image src="../../static/icons/shop.png" mode=""></image>
			</view>
		</uni-nav-bar>
		<view class="main">
			<navigator :url="'/pages/sort/product/index?id='+item.id" v-for="item in dataList" :key="item.id" class="main-item">
				<image :src="item.img" mode=""></image>
				<text class="zh">{{item.ctitle}}</text>
				<text class="en">{{item.etitle}}</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import { sortList } from "@/api/sort.js"
	export default {
		name: "SORT",
		data() {
			return {
				dataList: [],
				act: 1
			}
		},
		methods: {
			async init() {
				try {
					const { data } = await sortList();
					console.log(data)
					this.dataList = data;
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			}
		},
		created() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.sort {
		.header {
			position: fixed;
			z-index: 1;
			top: 0;
			height: 88rpx;

			.header_text_box {
				width: 100%;
				display: flex;
				justify-content: center;

				.act {
					border-bottom: 6rpx solid #FFFFFF;
					border-radius: 3rpx;
				}

				view {
					margin: 0 16rpx;
					line-height: 64rpx;
					font-family: PingFangSC-Regular;
					font-size: 32rpx;
					color: #FFFFFF;
					letter-spacing: 2.29rpx;
				}
			}

			.right {
				overflow: hidden;
			}

			.right image {

				float: left;
				margin-left: 16rpx;
			}

			.left image {
				margin-top: 26rpx;
			}

			image {
				width: 36rpx;
				height: 36rpx;
			}
		}

		.main {
			padding: $base-padding;
			background-color: $base-background;
			margin: $base-margin;
			overflow: hidden;

			.main-item {
				margin-top: 64rpx;
				width: 670rpx;
				height: 302rpx;
				border-radius: 20rpx;
				background-color: #FFFFFF;
				position: relative;

				image {
					width: 416rpx;
					height: 252rpx;
					margin-top: 50rpx;
					float: right;
				}

				text {
					position: absolute;
					left: 52rpx;
				}

				.zh {
					top: 148rpx;
					font-family: PingFangSC-Semibold;
					font-size: 48rpx;
					color: #3E3E3E;
					letter-spacing: 3.43rpx;
				}

				.en {
					top: 220rpx;
					font-family: PingFangSC-Regular;
					font-size: 30rpx;
					color: #7F7F7F;
					letter-spacing: 2.14rpx;
				}
			}
		}
	}
</style>
