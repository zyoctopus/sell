<template>
	<div class="rating-wrapper">
		<div class="rating-type">
			<span class="all block" :class="{'position-active':selectType===2}" @click="changeType(2)">{{typeName.all}}<span class="count">{{getCount(2)}}</span></span>
			<span class="positive block" :class="{'position-active':selectType===0}" @click="changeType(0)">{{typeName.positive}}<span class="count">{{getCount(0)}}</span></span>
			<span class="negative block" :class="{'negative-active':selectType===1}" @click="changeType(1)">{{typeName.nagetive}}<span class="count">{{getCount(1)}}</span></span>
		</div>
		<div class="toggle">
			<i class="icon-check_circle icon" :class="{'only':onlyContent}" @click="changeOnlyContent"></i><span>只看有内容评价</span>
		</div>
		<ul class="ratinglist">
			<li v-for="item in comRating" class="rating">
				<div class="time">{{getTime(item.rateTime)}}</div>
				<div class="user"><span class="username">{{item.username}}</span><img :src="item.avatar" width="12" height="12" class="avatar"></div>
				<div class="text">
					<span :class="{'icon-thumb_up positive':!item.rateType,'icon-thumb_down negative':item.rateType}" class="icon"></span>{{item.text}}<span v-if="item.text===''">此用户未填写评论</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props: {
			typeName: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						nagetive: '不满意'
					}
				}
			},
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: 2
			},
			onlyContent: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			comRating() {
				if (this.selectType === 2) {
					return this.ratings.filter(v => {
						return (this.onlyContent ? v.text !== '' : true)
					})
				} else if (this.selectType === 0) {
					return this.ratings.filter(v => {
						return (v.rateType === 0 && (this.onlyContent ? v.text !== '' : true))
					})
				} else {
					return this.ratings.filter(v => {
						return (v.rateType === 1 && (this.onlyContent ? v.text !== '' : true))
					})
				}
			}
		},
		methods: {
			getCount(type) {
				let count = 0
				if (type === 2) {
					return this.ratings.length
				}
				for (let i = 0; i < this.ratings.length; i++) {
					if (this.ratings[i].rateType === type) {
						count++
					}
				}
				return count
			},
			getTime(t) {
				let time = new Date(t)
				let month = time.getMonth() + 1
				return `${time.getFullYear()}-${month}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}`
			},
			changeType(type) {
				this.selectType = type
			},
			changeOnlyContent() {
				this.onlyContent = !this.onlyContent
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.rating-wrapper{
		.rating-type{
			padding-bottom: 18px;
			margin: 0 18px;
			border-bottom: 1px solid rgba(7, 17, 27, .1);
			.block{
				display: inline-block;
				padding: 8px 12px;
				font-size: 12px;
				line-height: 16px;
				margin-right: 8px;
				border-radius: 2px;
				color: rgb(77, 85, 93);
				.count{
					font-size: 8px;
					margin-left: 2px;
				}
			}
			.all{
				background-color: rgba(0, 160, 220, .2);
			}
			.positive{
				background-color: rgba(0, 160, 220, .2);
			}
			.negative{
				background-color: rgba(77, 85, 93, .2);
			}
			.position-active{
				color: #fff;
				background-color: rgb(0, 160, 220);
			}
			.negative-active{
				color: #fff;
				background-color: rgb(77, 85, 93);
			}
		}
		.toggle{
			font-size: 12px;
			color: rgb(147, 153, 159);
			line-height: 24px;
			padding: 12px 18px;
			border-bottom: 2px solid rgba(7, 17, 27, .1);
			.icon{
				font-size: 24px;
				line-height: 24px;
				vertical-align: middle;
				margin-right: 4px;
				&.only{
					color: rgb(0, 160, 220);
				}
			}
		}
		.ratinglist{
			.rating{
				padding: 16px 0;
				margin: 0 18px;
				position: relative;
				border-bottom: 1px solid rgba(7,17,27,.1);
				.time{
					font-size: 10px;
					color: rgb(147, 153, 159);
					line-height: 12px;
				}
				.user{
					position: absolute;
					top: 16px;
					right: 0;
					.username{
						vertical-align: top;
						font-size: 10px;
						color: rgb(147, 153, 159);
						line-height: 12px;
						margin-right: 6px;
					}
					.avatar{
						vertical-align: top;
						border-radius: 50%;
					}
				}
				.text{
					margin-top: 6px;
					font-size: 12px;
					color: rgb(7,17,27);
					line-height: 16px;
					.icon{
						font-size: 12px;
						line-height: 24px;
						margin-right: 4px;
						vertical-align: middle;
						&.positive{
							color: rgb(0, 160, 220);
						}
						&.negative{
							color: rgb(147, 153, 159);
						}
					}
				}
			}
		}
	}
</style>
