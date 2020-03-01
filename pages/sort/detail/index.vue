<template>
	<view class="sort-detail">
		<swiper :indicator-dots="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item in imgs" :key="item">
				<view class="swiper-item">
					<image :src="item" mode="" class="bg"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="content">
			<view class="zh">
				{{data.gname}}
			</view>
			<view class="en">
				{{data.ename||'未获得'}}
			</view>
			<view class="price">
				{{data.price_out}}
			</view>
			<view class="detail-title">
				{{data.detail_title}}
			</view>
			<view class="detail-content">
				{{data.descr}}
			</view>
		</view>
		<uni-goods-nav class="footer" :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
	</view>
</template>

<script>
	import { productDetail } from "@/api/product.js"
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		name: 'sort-detial',
		data() {
			return {
				productId: "",
				data: {},
				imgs: [],
				options: [{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/kefu.png',
					text: '客服'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/dianpu.png',
					text: '店铺'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#E2E2E2',
						color: '#000000'
					},
					{
						text: '立即购买',
						backgroundColor: '#354E44',
						color: '#fff'
					}
				]
			};
		},
		onLoad(option) {
			this.productId = option.id;
			console.log(option)
		},
		created() {
			this.init()
		},
		methods: {
			async init() {
				try {
					let { data } = await productDetail({ productId: this.productId });
					this.data = data
					this.imgs = data.imgs.split(",")
					console.log(this.imgs)
					console.log(data)
				} catch (e) {
					console.log(e)
				}
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				if (!e.index) {
					this.options[2].info++
				}
			}
		},
		components: { uniGoodsNav }
	}
</script>

<style lang="scss">
	.sort-detail {
		swiper {
			height: 600rpx;

			.bg {
				width: 750rpx;
				height: 600rpx;
			}
		}

		.content {
			padding: 0 72rpx;

			.zh {
				margin-top: 10rpx;
				font-family: PingFangSC-Semibold;
				font-size: 36.4rpx;
				color: #3E3E3E;
				letter-spacing: 2.6rpx;
			}

			.en {
				font-family: PingFangSC-Regular;
				margin-top: 10rpx;
				font-size: 30.8rpx;
				color: #B0B0B0;
				letter-spacing: 2.2rpx;
			}

			.price {
				margin-top: 23rpx;
				font-family: PingFangSC-Regular;
				font-size: 36.4rpx;
				color: #3E3E3E;
				letter-spacing: 2.6rpx;
			}

			.detail-title {
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				color: #3E3E3E;
				letter-spacing: 2rpx;
				line-height: 2;
			}

			.detail-content {
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #8A8A8A;
				letter-spacing: 2rpx;
				text-align: justify;
				line-height: 1.5;
			}
		}

		.footer {
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
</style>
