<template>
	<view class="sort-product">
		<view class="header_box">
			<uni-nav-bar class="header" backgroundColor="#354E44">
				<view class="header_text_box">
					{{title}}
				</view>
				<navigator slot="left" class="left" open-type="navigateBack" :delta="1">
					<image src="../../../static/icons/back.png" mode=""></image>
				</navigator>
				<view slot="right" class="right">
				</view>
			</uni-nav-bar>
			<!-- 导航 -->
			<radio-group @change="radioChange" class="nav">
				<label class="uni-list-cell uni-list-cell-pd" :class="index==current?'act':''" v-for="(item, index) in radioOption" :key="item.value">
					<radio :value="item.value" /><text>{{item.name}}</text>
				</label>
			</radio-group>
		</view>
		<!-- 头部 -->

		<!-- 商品展示列表 -->
		<mescroll-uni class="main" ref="mescrollRef" @init="mescrollInit" :fixed="false" :up="upOption" :down="downOption" @up="upCallback">
			<view class="uni-product-list">
				<navigator class="uni-product" :url="'/pages/sort/detail/index?id='+product.id" v-for="(product,index) in list" :key="product.id">
					<view class="image-view">
						<image class="uni-product-image" :src="product.cover_img"></image>
					</view>
					<view class="footer">
						<view class="uni-product-title">{{product.gname}}</view>
						<view class="uni-product-collect">{{product.descr}}</view>
						<view class="uni-product-price-address">
							<text>{{product.price_now}}</text>
							<text>{{product.origin_city}}</text>
						</view>
					</view>
				</navigator>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import { productList } from "@/api/product.js"
	export default {
		name: "sort-product",
		mixins: [MescrollMixin],
		data() {
			return {
				id: "",
				data: [],
				kind: {},
				title: '',
				params: {
					start: 1,
					limit: 10,
					kindId: ""
				},
				radioOption: [{
					value: '0',
					name: '新品'
				}, {
					value: '1',
					name: '销量'
				}, {
					value: '2',
					name: '价格'
				}, {
					value: '3',
					name: '筛选'
				}],
				current: 0,
				more: "more",
				upOption: {
					auto: false,
					use: true,
					offset: 100,
					page: {
						num: 0,
						size: 10,
						time: null
					}
				},
				downOption: {
					use: false,

				}
			}
		},
		methods: {
			async init() {
				try {
					let { data, kind } = await productList(this.params);
					console.log(data)
					data.list.forEach(item => {
						this.data.push(item)
					})
					this.kind = kind;
					this.title = kind.ctitle
					return data.list.length
				} catch (e) {
					console.log(e)
					return 0;
				}
			},
			radioChange(EventHandle) {
				console.log(EventHandle.detail)
				this.current = Number(EventHandle.detail.value)
			},
			async upCallback(mescroll) {
				this.params.start++;
				let length = await this.init()
				console.log(length)
				if (length) {
					mescroll.endUpScroll(false)
				} else {
					mescroll.endUpScroll(true)
				}
			},

			mescrollInit(mescroll) {
				console.log((mescroll))
			}
		},
		onLoad(option) {
			this.params.kindId = option.id;
			this.init()
		},
		computed: {
			list() {
				switch (this.current) {
					case 0:
						return this.data;
						break;
					case 2:
						let arr = [];
						this.data.forEach(item => {
							if (Object.prototype.toString.call(item) === "[object Object]") {
								arr.push({ ...item })
							}
						})
						return  arr.sort((a, b) => a.price_now - b.price_now);
				}
			}
		},
		components: { uniLoadMore }
	}
</script>

<style lang="scss" scoped>
	@mixin textOver {

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.sort-product {
		display: flex;
		flex-direction: column;
		background-color: $base-color;
		overflow: hidden;
		height: 100%;
	}

	.hader_box {
		position: fixed;
		top: 0;
		z-index: 1;
	}

	.header {


		.left image {
			display: block;
			width: 32rpx;
			height: 32rpx;
		}

		.header_text_box {
			width: 100%;
			text-align: center;
			font-family: PingFangSC-Regular;
			font-size: 34rpx;
			color: #FFFFFF;
			letter-spacing: 2.43rpx;
		}
	}

	.nav {
		display: flex;
		justify-content: space-around;
		color: #fff;
		padding: 10rpx 0;

		radio {
			display: none;
		}

		label {
			line-height: 2;
		}

		.act {
			border-bottom: 6rpx solid #F1ECE7;
			border-radius: 10px 10px 0 0;
		}
	}

	.main {
		flex: 1;
		border-top-right-radius: 40rpx;
		border-top-left-radius: 40rpx;
		background-color: $base-background;
		overflow: auto;
	}

	.uni-product-list {
		padding: $base-padding;
		padding-top: 40rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.uni-product {
			margin-top: 48rpx;
		}

		.uni-product-image {
			width: 316rpx;
			height: 238rpx;
		}

		.uni-product-title {
			font-family: PingFangSC-Semibold;
			font-size: 26rpx;
			color: #3E3E3E;
			letter-spacing: 1.86rpx;
			line-height: 2;
			@include textOver
		}

		.uni-product-collect {
			font-family: PingFangSC-Regular;
			font-size: 22rpx;
			color: #8D8D8D;
			letter-spacing: 1.57rpx;
			line-height: 2;
			@include textOver
		}

		.uni-product-price-address {
			display: flex;
			justify-content: space-between;
			margin-top: 26rpx;

			@include textOver text:first-child {
				font-family: PingFangSC-Semibold;
				font-size: 26rpx;
				color: #3E3E3E;
				letter-spacing: 1.86px;
			}

			text:last-child {
				font-family: PingFangSC-Regular;
				font-size: 22rpx;
				color: #3E3E3E;
				letter-spacing: 1.57rpx;
			}
		}
	}

	.uni-load-more {
		background-color: $base-background;
	}
</style>
