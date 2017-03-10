<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul class="menu-list">
				<li class="menu-item menu-item-hook" v-for="(item, $index) in goods" :class="{'current':currentIndex===$index}" @click="foodsScroll($index,$event)">
					<span class="name">
						<span class="icon" v-if="item.type>-1" :class="supType[item.type]">
						</span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="goodsWrapper">
			<ul class="goods-list">
				<li class="goods-item goods-item-hook" v-for="item in goods">
					<h2 class="item-title">{{item.name}}</h2>
					<ul>
						<li class="food-item" v-for="food in item.foods">
							<div class="icon">
								<img :src="food.icon" width="57" height="57">
							</div>
							<div class="content">
								<div class="food-name">{{food.name}}</div>
								<div class="description" v-if="food.description">{{food.description}}</div>
								<div class="sell">
									<span class="sell-count">月售{{food.sellCount}}份</span>
									<span class="sell-rating">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="current">￥{{food.price}}</span>
									<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartCtrl-wrapper">
									<cart-ctrl :food="food" @addCart="addCart"></cart-ctrl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shop-cart :seller="seller" :goods-info="goodsInfo" ref="shopCart"></shop-cart>
	</div>
</template>

<script >
	import BScroll from 'better-scroll'
	import shopCart from '../shopcart/shopcart.vue'
	import cartCtrl from '../cartctrl/cartctrl.vue'
	export default {
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: ''
			}
		},
		props: ['seller'],
		created() {
			this.$http.get('/api/goods').then((res) => {
				if (res.body.errno === 0) {
					this.goods = res.body.data

					// 更新数据后立刻调用该方法，实现滚动
					this.$nextTick(() => {
						this._initScroll()
						this._getHeight()
					})
				}
			})
			this.supType = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			// this.$on('add-cart', this.addCart)
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let h1 = this.listHeight[i]
					let h2 = this.listHeight[i + 1]
					if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
						// console.log(i)
						return i
					}
				}
				return 0
			},
			goodsInfo() {
				let infoArr = []
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							infoArr.push(food)
						}
					})
				})
				return infoArr
			}
		},
		methods: {
			foodsScroll(index, e) {
				if (!e._constructed) {
					return
				}
				// console.log(index, e)
				let ele = this.$refs.goodsWrapper.getElementsByClassName('goods-item-hook')[index]
				this.foodScroll.scrollToElement(ele, 300)
			},
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				})
				this.foodScroll = new BScroll(this.$refs.goodsWrapper, {
					click: true,
					probeType: 3
				})
				this.foodScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y))
				})
			},
			_getHeight() {
				let lis = this.$refs.goodsWrapper.getElementsByClassName('goods-item-hook')
				let hight = 0
				this.listHeight.push(hight)
				for (let i = 0; i < lis.length; i++) {
					hight += lis[i].clientHeight
					this.listHeight.push(hight)
				}
				// console.log(this.listHeight)
			},

			// 接收子组件点击时的target
			addCart(target) {
				this.$refs.shopCart.drop(target)
				// console.log(target)
			}
		},
		components: {
			shopCart,
			cartCtrl
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import '../../common/less/img.less';
	@import '../../common/less/mixin.less';
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		.menu-wrapper{
			width: 80px;
			flex: 0 0 80px;
			height: 100%;
			background-color: #f3f5f7;
			overflow: hidden;
			.menu-list{
				.menu-item{
					display: table;
					height: 54px;
					width: 56px;
					line-height: 14px;
					padding: 0 12px;
					font-size: 12px;
					&.current{
						background-color: #fff;
						position: relative;
						margin-top: -1px;
						font-weight: 700;
						z-index: 10;
						.name{
							.border-none();
						}
					}
					.name{
						display: table-cell;
						vertical-align: middle;
						.border-1px(rgba(7, 17, 27, .1));
						.icon{
				            display: inline-block;
				            vertical-align: middle;
				            width: 12px;
				            height: 12px;
				            margin-right: 2px;
				            background-size: 12px 12px;
				            background-repeat: no-repeat;
				          	&.decrease{
				            	.background-img("../img/decrease_3@2x.png", "../img/decrease_3@3x.png");
				            }
				          	&.discount{
				            	.background-img("../img/discount_3@2x.png", "../img/discount_3@3x.png");
				            }
				          	&.special{
				            	.background-img("../img/special_3@2x.png", "../img/special_3@3x.png");
				            }
				          	&.invoice{
				            	.background-img("../img/invoice_3@2x.png", "../img/invoice_3@3x.png");
				            }
				          	&.guarantee{
				            	.background-img("../img/guarantee_3@2x.png", "../img/guarantee_3@3x.png");
				            }
						}
					}
				}
			}
		}
		.goods-wrapper{
			flex: 1;
			overflow: hidden;
			.goods-item{
				width: 100%;
				.item-title{
					height: 26px;
					line-height: 26px;
					padding-left: 13px;
					border-left: 2px solid #d9dde1;
					background-color: #f3f5f7;
					color: rgb(147, 152, 159);
					font-size: 12px;
				}
				.food-item{
					margin: 18px 18px 0px 18px;
					padding-bottom: 18px;
					display: flex;
					.border-1px(rgba(7,17,27,.1));
					&:last-child{
						.border-none();
					}
					.icon{
						flex: 0 0 57px;
						margin-right: 10px;
					}
					.content{
						flex: 1;
						font-size: 0;
						.food-name{
							font-size: 14px;
							color: rgb(7, 17, 27);
							line-height: 14px;
							margin-top: 2px;
							margin-bottom: 8px;
						}
						.description{
							font-size: 10px;
							color: rgb(147,153,159);
							line-height: 12px;
							margin-bottom: 8px;
						}
						.sell{
							font-size: 10px;
							color: rgb(147,153,159);
							line-height: 10px;
							.sell-count{
								margin-right: 12px;
							}
						}
						.price{
							line-height: 24px;
							font-weight: 700;
							.current{
								font-size: 14px;
								color: rgb(240,20,20);
								margin-right: 8px;
							}
							.old{
								font-size: 10px;
								color: rgb(147,153,159);
								text-decoration: line-through;
							}
						}
						.cartCtrl-wrapper{
							position: absolute;
							right: -6px;
							bottom: 12px;
						}
					}
				}
			}
		}
	}
</style>
