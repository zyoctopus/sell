<template>
	<div class="cartctrl">
		<transition name="dec">
			<div class="decrease" v-show="food.count>0" @click="decCount($event)">
				<span class="icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="count" v-show="food.count>0">
			<span class="num">{{food.count}}</span>
		</div>
		<div class="add" @click="addCount($event)">
			<span class="icon-add_circle"></span>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object,
				default: {
					count: 0
				}
			}
		},
		methods: {
			addCount(e) {
				// console.log(e)
				if (!e._constructed) {
					return
				}
				if (!this.food.count) {
					// this.food.count = 1
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count ++
				}

				// 派发一个事件传递点击对象给父组件
				this.$emit('addCart', e.target)
			},
			decCount(e) {
				if (!e._constructed) {
					return
				}
				if (this.food.count > 0) {
					this.food.count --
				}
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.cartctrl{
		font-size: 0;
		.decrease, .add{
			display: inline-block;
			height: 24px;
			line-height: 24px;
			font-size: 24px;
			ont-weight: 700;
			color: rgb(0, 160, 220);
			padding: 6px;
		}
		.decrease{
			// padding: 6px 0 6px 6px;
			transition: all 0.5s;
			&.dec-enter{
				opacity: 0;
				transform: translate3d(24px, 0, 0) rotate(180deg);
			}
			&.dec-leave-active{
				opacity: 0;
				transform: translate3d(24px, 0, 0) rotate(180deg);
			}
		}
		.count{
			display: inline-block;
			height: 24px;
			line-height: 24px;
			text-align: center;
			font-size: 10px;
			color: rgb(147, 153, 159);
			vertical-align: top;
			padding: 6px 0;
		}
	}
</style>
