<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="icon-wrapper">
					<div class="icon" :class="{'has-goods':totalCount>0}">
						<span class="icon-shopping_cart"></span>
						<span class="good-count" v-show="totalCount>0">{{totalCount}}</span>
					</div>
				</div>
				<div class="price" :class="{'has-goods':calculatePrice>0}">
					<span class="val">￥{{calculatePrice}}</span>
				</div>
				<div class="description">
					<span>另需配送费￥{{seller.deliveryPrice}}</span>
				</div>
			</div>
			<div class="content-right">
				<div class="price-desc" :class="{'clearing':calculatePrice>=seller.minPrice}">
					<span class="price">{{payDescription}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			seller: Object,
			goodsInfo: {
				type: Array,
				default: () => []
			}
		},
		computed: {
			calculatePrice() {
				let total = 0
				this.goodsInfo.forEach((v) => {
					total += v.price * v.count
				})
				return total
			},
			totalCount() {
				let count = 0
				this.goodsInfo.forEach((v) => {
					count += v.count
				})
				return count
			},
			payDescription() {
				if (this.calculatePrice === 0) {
					return `￥${this.seller.minPrice}起送`
				} else if (this.calculatePrice < this.seller.minPrice) {
					let diff = this.seller.minPrice - this.calculatePrice
					return `还差￥${diff}起送`
				} else {
					return '去结算'
				}
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.shopcart{
		position: fixed;
		bottom: 0;
		left: 0;
		height: 48px;
		width: 100%;
		z-index: 50;
		color: rgba(255, 255, 255, 0.4);
		.content{
			display: flex;
			height: 100%;
			.content-left{
				flex: 1;
				background-color: #141d27;
				padding: 12px;
				font-size: 0;
				.icon-wrapper{
					position: relative;
					display: inline-block;
					height: 44px;
					width: 44px;
					border: 6px solid #141d27;
					background-color: #141d27;
					border-radius: 50%;
					top: -22px;
					.icon{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						background-color: #2b343c;
						font-size: 24px;
						line-height: 24px;
						text-align: center;
						line-height: 44px;
						&.has-goods{
							background-color: rgb(0, 160, 220);
							color: #fff;
						}
						.good-count{
							position: absolute;
							top: -6px;
							right: -6px;
							display: inline-block;
							border-radius: 8px;
							width: 24px;
							height: 16px;
							line-height: 16px;
							text-align: center;
							background-color: rgb(240, 20, 20);
							font-size: 9px;
							font-weight: 700;
							color: #fff;
							box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
						}
					}
				}
				.price{
					display: inline-block;
					vertical-align: top;
					font-size: 16px;
					font-weight: 700;
					line-height: 24px;
					padding: 0 12px;
					border-right: 1px solid rgba(255, 255, 255, .1);
					&.has-goods{
						color: #fff;
					}
				}
				.description{
					display: inline-block;
					vertical-align: top;
					font-size: 12px;
					line-height: 24px;
					padding-left: 12px;
				}
			}
			.content-right{
				width: 105px;
				height: 48px;
				flex: 0 0 105px;
				background-color: #2b333b;
				.price-desc{
					width: 100%;
					height: 100%;
					text-align: center;
					line-height: 48px;
					font-size: 12px;
					font-weight: 700;
					&.clearing{
						color: #fff;
						background-color: #00b43c;
					}
				}
			}
		}
	}
</style>
