<template>
	<view class="home">
		<uni-nav-bar class="header" backgroundColor="#354E44">
			<view class="header_text_box">
				<view class="header_left_text" :class="act===1?'act':''" @tap="act=1">推荐</view>
				<view class="header_right_text" :class="act===2?'act':''" @tap="act=2">品牌</view>
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
			<view class="prefer" v-show="act===1">
				<view class="swiper">
					<swiper :indicator-dots="true">
						<swiper-item v-for="item in banners" :key="item.id">
							<view class="swiper-item">
								<image :src="item.img_url" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="center">
					<view class="title">
						<text>品类推荐</text>
						<text>更多></text>
					</view>
					<view class="content">
						<view class="content-item">
							<image src="../../static/icons/sofa.png" mode=""></image>
						</view>
						<view class="content-item">
							<image src="../../static/icons/sofa.png" mode=""></image>
						</view>
						<view class="content-item">
							<image src="../../static/icons/sofa.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="footer">
					<view class="title">
						<text>特色优选</text>
						<text>更多></text>
					</view>
					<view class="content">
						<swiper :indicator-dots="true" previous-margin="70rpx" next-margin="50rpx">
							<swiper-item>
								<view class="swiper-item">
									<image src="../../static/images/swiper_01.png" mode=""></image>
									<view class="bg"></view>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">
									<image src="../../static/images/swiper_02.png" mode=""></image>
									<view class="bg"></view>
								</view>
							</swiper-item>
							<swiper-item>
								<view class="swiper-item">
									<image src="../../static/images/swiper_03.png" mode=""></image>
									<view class="bg"></view>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<view class="brand" v-show="act===2">
				<view class="brand_item" v-for="item in  brandList" :key="item.id">
					<image :src="item.coverImg" mode=""></image>
					<view class="footer">
						<view class="title">{{item.cname}}</view>
						<view class="desc">{{item.descr}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import { bannerList, brandList } from "@/api/home.js"
	export default {
		data() {
			return {
				banners: [],
				brandList: [],
				act: 1
			}
		},
		methods: {
			async init() {
				try {
					let { data } = await bannerList({ use: "0" })
					this.banners = data
					console.log(data)
				} catch (e) {
					console.log(e)
				}
			},

			async getBrand() {
				try {
					let brandRes = await brandList({ start: "1", limit: "10" })
					this.brandList = brandRes.data.list
					console.log(brandRes)
				} catch (e) {
					console.log(e)
					//TODO handle the exception
				}
			}
		},
		created() {
			this.init();
			this.getBrand()
		},
		onLoad() {
			let mine = this;
			console.log(bannerList)
		},
		onReachBottom() {
			console.log("已经到底部")
		},
		onPageScroll() {
			console.log("滚动")
		},
		components: { uniNavBar }
	}
</script>

<style lang="scss" scoped>
	@import "~@/static/css/common.scss";

	.home {
		background-color: $base-background;

		.prefer {
			.center {
				margin-top: 40rpx;
				padding: $base-padding;

				.title {
					margin-bottom: 40rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				text:first-child {
					font-family: PingFangSC-Semibold;
					font-size: 32rpx;
					color: #3E3E3E;
					letter-spacing: 2.29rpx;
				}

				text:last-child {
					font-family: PingFangSC-Regular;
					font-size: 26rpx;
					color: #8C8C8C;
					letter-spacing: 1.86rpx;
				}

				.content {
					display: flex;
					justify-content: space-between;

					.content-item {
						width: 208rpx;
						height: 140rpx;
						background: #FFFFFF;
						border-radius: 20rpx;
						overflow: hidden;

						image {
							display: block;
							width: 140rpx;
							height: 124rpx;
							margin: 8rpx auto;
						}
					}
				}
			}

			.footer {
				.title {
					margin-bottom: 40rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				text:first-child {
					font-family: PingFangSC-Semibold;
					font-size: 32rpx;
					color: #3E3E3E;
					letter-spacing: 2.29rpx;
				}

				text:last-child {
					font-family: PingFangSC-Regular;
					font-size: 26rpx;
					color: #8C8C8C;
					letter-spacing: 1.86rpx;
				}

				.content {
					swiper {
						height: 260rpx;
					}

					.swiper-item {
						position: relative;

						.bg {
							position: absolute;
							top: 54rpx;
							width: 590rpx;
							height: 260rpx;
							border-radius: 20rpx;
							background-color: #fff;
							z-index: -1;
						}

						image {
							width: 194rpx;
							height: 280rpx;
							margin-left: 44rpx;
						}
					}
				}
			}
		}

		swiper {
			height: 480rpx;

			image {
				display: block;
				width: 750rpx;
			}
		}


		.brand {
			padding: $base-padding;
			margin: $base-margin;
			overflow: hidden;

			.brand_item {
				margin-top: 68rpx;

				.title {
					font-family: PingFangSC-Semibold;
					font-size: 32rpx;
					color: #3E3E3E;
					letter-spacing: 2.29rpx;
					line-height: 1.5;
				}

				.desc {
					font-family: PingFangSC-Regular;
					font-size: 22rpx;
					color: #B1B1B1;
					letter-spacing: 1.57rpx;
					line-height: 1.5;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}


				.footer {
					padding-left: 56rpx;
					height: 86rpx;
					border-bottom-right-radius: 20rpx;
					border-bottom-left-radius: 20rpx;
					background-color: #fff;
				}
			}

			image {
				width: 670rpx;
				height: 426rpx;
				display: block;
				border-top-left-radius: 20rpx;
				border-top-right-radius: 20rpx;
			}
		}





	}
</style>
