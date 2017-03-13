<template>
	<transition name="mask">
		<div class="fooddetail-mask" v-show="maskshow" ref="fooddetailMask">
			<div class="food-content">
				<div class="food-img">
					<img :src="selectedfood.image" class="img">
					<div class="icon" @click="back">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="food-info">
					<div class="food-name">
						<span class="name">{{selectedfood.name}}</span>
					</div>
					<div class="evaluate">
						<span>月售{{selectedfood.sellCount}}份</span><span class="rating">好评率{{selectedfood.rating}}%</span>
					</div>
					<div class="price">
						<span class="new">￥{{selectedfood.price}}</span><span class="old" v-show="selectedfood.oldPrice!==''">￥{{selectedfood.oldPrice}}</span>
					</div>
					<div class="cart-ctrl">
						<cart-ctrl :food="selectedfood" @addCart="addCart"></cart-ctrl>
					</div>
					<transition name="add">
						<div class="addcart" v-show="!selectedfood.count||selectedfood.count===0" @click.stop="addtocart($event)">加入购物车</div>
					</transition>
				</div>
				<div class="bar"></div>
				<div class="food-description" v-show="selectedfood.info">
					<div class="title">商品介绍</div>
					<div class="content">{{selectedfood.info}}</div>
				</div>
				<div class="bar" v-show="selectedfood.info"></div>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<rating-select :typeName="typeName" :ratings="selectedfood.ratings" :selectType="selectType" :onlyContent="onlyContent"></rating-select>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import cartCtrl from '../cartctrl/cartctrl.vue'
	import ratingSelect from '../ratingselect/ratingselect.vue'
	// const POSITIVE = 0
	// const NEGATIVE = 1
	const ALL = 2
	export default {
		data() {
			return {
				maskshow: false,
				typeName: {
					all: '全部',
					positive: '推荐',
					nagetive: '吐槽'
				},
				selectType: ALL,
				onlyContent: false
			}
		},
		props: {
			selectedfood: {
				type: Object
			},
			addCart: Function
		},
		methods: {
			show() {
				this.selectType = ALL
				this.onlyContent = false
				this.maskshow = true
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.fooddetailMask, {
							click: true
						})
					} else {
						this.scroll.refresh()
					}
				})
			},
			back() {
				this.maskshow = false
			},
			addtocart(e) {
				if (!e._constructed) {
					return
				}
				if (!this.selectedfood.count) {
					Vue.set(this.selectedfood, 'count', 1)
					// console.log(this.selectedfood)
					this.addCart(e.target)
				}
			}
		},
		components: {
			cartCtrl,
			ratingSelect
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.fooddetail-mask{
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		bottom: 48px;
		overflow: hidden;
		background-color: #fff;
		transition: all 0.2s;
		z-index: 40;
		&.mask-enter,&.mask-leave-active{
			transform: translate3d(100%, 0, 0);
		}
		.food-content{
			.food-img{
				position: relative;
				width: 100%;
				height: 0;
				padding-top: 100%;
				.img{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
				.icon{
					position: absolute;
					top: 10px;
					left: 10px;
					padding: 10px;
					font-size: 20px;
					color: #fff;
				}
			}
			.food-info{
				padding: 18px;
				position: relative;
				.food-name{
					font-size: 14px;
					font-weight: 700;
					color: rgb(7, 17, 27);
					line-height: 14px;
					margin-bottom: 8px;
				}
				.evaluate{
					font-size: 10px;
					color: rgb(147, 153, 159);
					line-height: 10px;
					margin-bottom: 18px;
					.rating{
						margin-left: 12px;
					}
				}
				.price{
					padding: 6px 0;
					.new{
						font-size: 14px;
						font-weight: 700;
						line-height: 14px;
						color: rgb(240, 20, 20);
					}
					.old{
						font-size: 10px;
						font-weight: 700;
						color: rgb(147, 153, 159);
						line-height: 14px;
						text-decoration: line-through;
						margin-left: 10px;
					}
				}
				.cart-ctrl{
					position: absolute;
					right: 12px;
					bottom: 12px;
				}
				.addcart{
					position: absolute;
					right: 18px;
					bottom: 18px;
					width: 74px;
					height: 24px;
					line-height: 24px;
					background-color: rgb(0,160,220);
					border-radius: 12px;
					font-size: 10px;
					text-align: center;
					color: #fff;
					z-index: 10;
					transition: all 0.2s;
					&.add-enter,&.add-leave-active{
						opacity: 0;
					}
				}
			}
			.bar{
				height: 16px;
				background-color: #f3f5f7;
				border-top: 2px solid rgba(7,17,27,.1);
				border-bottom: 2px solid rgba(7,17,27,.1);
			}
			.food-description{
				padding: 18px;
				.title{
					font-size: 14px;
					color: rgb(7, 17, 27);
					margin-bottom: 6px;
				}
				.content{
					font-size: 12px;
					color: rgb(77,85,93);
					line-height: 24px;
					padding: 0 8px;
				}
			}
			.rating{
				.title{
					padding: 18px;
					font-size: 14px;
					color: rgb(7, 17, 27);
				}
			}
		}

	}
</style>
