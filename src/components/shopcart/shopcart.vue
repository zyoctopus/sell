<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left" @click="toggleShow">
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
			<div class="ball-wrapper">
				<ul>
					<transition 
					v-for="ball in ballsList" 
					:key="ball.id" 
					@before-enter="dropBeforeEnter" 
					@enter="dropEnter" 
					@after-enter="dropAfterEnter">
						<li class="ball" v-show="ball.show"><span class="inner"></span></li>
					</transition>
				</ul>
			</div>
			<transition name="pop">
				<div class="shopcart-list" v-show="listShow">
					<div class="shopcart-header">
						<span class="title">购物车</span>
						<span class="clear" @click="clearCart">清空</span>
					</div>
					<div class="shopcart-content" ref="shopcartContent">
						<ul>
							<li class="good-item" v-for="item in goodsInfo">
								<span class="good-name">{{item.name}}</span>
								<span class="price">￥{{item.price*item.count}}</span>
								<cart-ctrl class="cart-ctrl" :food="item" @addCart="drop"></cart-ctrl>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="mask">
			<div class="cart-mask" v-show="listShow" @click="toggleShow"></div>
		</transition>
	</div>
</template>

<script>
	import cartCtrl from '../cartctrl/cartctrl.vue'
	import BScroll from 'better-scroll'
	export default {
		data() {
			return {
				ballsList: [{
					show: false
				}, {
					show: false
				}, {
					show: false
				}, {
					show: false
				}, {
					show: false
				}],
				dropList: [],
				flag: false
			}
		},
		props: {
			seller: {
				type: Object,
				default: {}
			},
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
			},
			listShow() {
				if (!this.totalCount) {
					this.flag = false
					return false
				}

				if (this.flag) {
					this.$nextTick(() => {
						if (!this.scroll) {
							this.scroll = new BScroll(this.$refs.shopcartContent, {
								click: true
							})
						} else {
							this.scroll.refresh()
						}
					})
				}
				return this.flag
			}
		},
		methods: {
			drop(target) {
				// console.log(target)
				for (var i = 0; i < this.ballsList.length; i++) {
					let ball = this.ballsList[i]
					if (!ball.show) {
						ball.show = true
						ball.el = target
						this.dropList.push(ball)
						return
					}
				}
			},
			dropBeforeEnter(el) {
				for (var i = 0; i < this.dropList.length; i++) {
					let ball = this.dropList[i]
					let rect = ball.el.getBoundingClientRect()
					let x = rect.left - 32
					let y = -(window.innerHeight - rect.top - 20)
					el.style.webkitTransform = `translate3d(0,${y}px,0)`
					el.style.transform = `translate3d(0,${y}px,0)`
					let inner = el.getElementsByClassName('inner')[0]
					inner.style.webkitTransform = `translate3d(${x}px,0,0)`
					inner.style.transfrom = `translate3d(${x}px,0,0)`
					// console.log(inner, x, y)
				}
			},
			dropEnter(el) {
				// 触发vue重绘？为什么这样可以
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight
				this.$nextTick(() => {
					el.style.webkitTransform = `translate3d(0,0,0)`
					el.style.transform = `translate3d(0,0,0)`
					let inner = el.getElementsByClassName('inner')[0]
					inner.style.webkitTransform = `translate3d(0,0,0)`
					inner.style.transfrom = `translate3d(0,0,0)`
				})
			},
			dropAfterEnter(el) {
				let ball = this.dropList.shift()
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
			},
			toggleShow() {
				if (!this.totalCount) {
					this.flag = false
					return
				}
				this.flag = !this.flag
			},
			clearCart() {
				this.goodsInfo.forEach((v) => {
					v.count = 0
				})
			}
		},
		components: {
			cartCtrl
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
			.ball-wrapper{
				position: fixed;
				left: 32px;
				bottom: 20px;
				z-index: 200;
				.ball{
					position: absolute;
					left: 0;
					bottom: 0;
					transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
					.inner{
						display: inline-block;
						width: 16px;
						height: 16px;
						border-radius: 50%;
						background-color: rgb(0, 160, 220);
						transition: all 0.4s linear;
					}
				}
			}
			.shopcart-list{
				position: absolute;
				left: 0;
				top: 0;
				z-index: -1;
				width: 100%;
				transform: translate3d(0, -100%, 0);
				transition: all 0.5s;
				&.pop-enter,&.pop-leave-active{
					transform: translate3d(0, 0, 0);
				}
				.shopcart-header{
					height: 40px;
					background-color: #f3f5f7;
					padding: 0 18px;
					line-height: 40px;
					border-bottom: 2px solid rgba(7, 17, 27, 0.1);
					.title{
						font-size: 14px;
						color: rgb(7, 17, 27);
					}
					.clear{
						float: right;
						font-size: 12px;
						color: rgb(0, 160, 220);
					}
				}
				.shopcart-content{
					background-color: #fff;
					padding: 0 18px;
					max-height: 217px;
					overflow: hidden;
					.good-item{
						position: relative;
						height: 48px;
						line-height: 48px;
						border-bottom: 1px solid rgba(7, 17, 27, 0.1);
						.good-name{
							font-size: 14px;
							color: rgb(7, 17, 27);
						}
						.price{
							position: absolute;
							right: 90px;
							font-size: 14px;
							font-weight: 700;
							color: rgb(240, 20, 20);
						}
						.cart-ctrl{
							float: right;
							height: 100%;
							padding: 6px 0;
							box-sizing: border-box;
						}
					}
				}
			}
		}
		.cart-mask{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -2;
			background-color: rgba(7, 17, 27, 0.6);
			transition: all 0.5s;
			&.mask-enter,&.mask-leave-active{
				opacity: 0;
			}			
		}
	}
</style>
