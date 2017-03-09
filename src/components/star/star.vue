<template>
	<div id="star-component" :class="starType">
		<span class="star-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
	</div>
</template>

<script>
	export default {
		props: ['size', 'score'],
		computed: {
			starType() {
				return 'star-' + this.size
			},
			itemClasses() {
				let arr = []
				let score = Math.floor(this.score * 2) / 2
				let hasHalf = !(score % 1 === 0)
				score = ~~score
				for (let i = 0; i < score; i++) {
					arr.push('on')
				}
				if (hasHalf) {
					arr.push('half')
				}
				while (arr.length < 5) {
					arr.push('off')
				}
				return arr
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import '../../common/less/img.less';
	#star-component{
		font-size: 0;
		&.star-24{
			.star-item{
				display: inline-block;
				width: 10px;
				height: 10px;
				background-size: 10px 10px;
				background-repeat: no-repeat;
				margin-right: 3px;
				&.on{
					.background-img("../img/star24_on@2x.png", "../img/star24_on@3x.png");
				}
				&.half{
					.background-img("../img/star24_half@2x.png", "../img/star24_half@3x.png");
				}
				&.off{
					.background-img("../img/star24_off@2x.png", "../img/star24_off@3x.png");
				}
			}
		}
		&.star-36{
			.star-item{
				display: inline-block;
				width: 15px;
				height: 15px;
				background-size: 15px 15px;
				background-repeat: no-repeat;
				margin-right: 6px;
				&.on{
					.background-img("../img/star36_on@2x.png", "../img/star36_on@3x.png");
				}
				&.half{
					.background-img("../img/star36_half@2x.png", "../img/star36_half@3x.png");
				}
				&.off{
					.background-img("../img/star36_off@2x.png", "../img/star36_off@3x.png");
				}	
			}
		}
		&.star-48{
			.star-item{
				display: inline-block;
				width: 20px;
				height: 20px;
				background-size: 20px 20px;
				background-repeat: no-repeat;
				margin-right: 22px;
				&.on{
					.background-img("../img/star48_on@2x.png", "../img/star48_on@3x.png");
				}
				&.half{
					.background-img("../img/star48_half@2x.png", "../img/star48_half@3x.png");
				}
				&.off{
					.background-img("../img/star48_off@2x.png", "../img/star48_off@3x.png");
				}	
			}
		}
		&:last-child{
			margin-right: 0;
		}
	}
</style>
