<template>
	<view class="img">
		<view>
			<template>
				<view style="font-weight: bold; text-align: center; font-size: 20px;">今日完成度挑战</view>
				<u-line-progress :percentage="this.title[number]
					.topTextnumber" :showText="false"></u-line-progress>
			</template>
			<view style="font-size: 18px;" :plain="true" v-html="topText"></view>
		</view>
		<view class="my-balls">
			<view v-for="(ball,index) in randomArr" :key="index">
				<!-- 动画 -->
				<view :animation="animationData" @click="turn(index)" :class="xxhh[index]"
					:style="{left: `${ball.left}px`,top:`${ball.top}px`,}">
					<view class='icon'>
						<u-icon :name="uicon[index]" size="50px"></u-icon>
					</view>
					<view>{{title[index].title}}</view>
				</view>
			</view>
		</view>
		<!-- 模态框 -->
		<u-modal :show="show" @confirm="confirm(number)" :closeOnClickOverlay="true" confirmText='我完成了' @close="close">
			<view align='center'>
				<u-icon :name="uicon[number]" size="60px" style='margin:0 100px;'></u-icon>
				<view style="font-style: italic; font-weight:bold;margin: 10px 0; font-size:20px;color: #04457f;;">
					{{title[number].title}}
				</view>
				<view>{{text[number]}}</view>
				<view style=" font-weight:bold;margin: 10px 0; font-size:18px;color: black;">久坐站立的次数
				</view>
				<view class="btn">
					<view style="height: 30px; font-size:20px">1次</view>
					<view style="height: 30px; color: #aabebd;  font-size:15px">2次</view>
				</view>
			</view>
		</u-modal>
		<!-- 遮罩层 -->
		<u-overlay :show="layer" @click="maskshow">
			<view class="warp">
				<view>
					<u-icon name="photo" color="#2979ff" size="100"></u-icon>
				</view>

			</view>
		</u-overlay>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				animationData: {},
				show: false,
				timer: '',
				flag: true,
				able: true,
				tips: '',
				client: 0,
				randomArr: [],
				maxCount: 5,
				number: 0,
				layer: false,
				topText: `今天式小迈配你的第七天在打卡两天即可收获的依云矿泉水50ml 快来开启今天的打卡吧`,

				xxhh: [
					"high",
					"Medium",
					"low",
					"high",
					"low",
				],
				text: ['建议每个小时站立活动一下尽可能增减动力', '建议每天要喝到8杯水才可以', '建议不要吃外卖', '建议步行超过1千米，有利于身心健康'],
				num: [
					2500, 1000, 2000, 2300, 1800
				],
				title: [{
						title: '喝 8 杯水',
						index: 1,
						topTextnumber: 0
					},
					{
						title: '不吃外卖',
						index: 1,
						topTextnumber: 0
					},
					{
						title: '不久坐',
						index: 1,
						topTextnumber: 0
					},
					{
						title: '步行超过 1 千米',
						index: 1,
						topTextnumber: 0
					},
					{
						title: '23 点之前睡',
						index: 1,
						topTextnumber: 0
					}
				],
				uicon: ['minus-circle-fill', 'clock-fill', 'checkmark-circle', 'server-man', 'android-fill']
			}
		},
		onReady() {
			let _this = this;
			clearInterval(_this.timer);
			_this.timer = setInterval(function() {
				_this.breatheLight()
				_this.flag = !_this.flag;
				// console.log("定时到了")
				clearInterval(_this.timer);
				_this.timer = setInterval(function() {
					_this.breatheLight()
					_this.flag = !_this.flag;
					// console.log("定时到了1")
				}.bind(_this), 2500)
			}.bind(_this), 200)
		},
		created() {

		},
		onLoad() {
			this.createdBalls()
			let _this = this;
			//获取屏幕的宽度
			uni.getSystemInfo({
				success: function(res) {
					_this.client = res.windowWidth
				}
			})
			console.log(this.client)
		},
		methods: {
			//遮罩层的点击清除事件
			maskshow() {
				this.layer = false
			},
			//模态框的点击确认事件
			confirm(index) {
				this.maxCount = this.maxCount - 1

				this.show = false;
				//this.maxCount = 1
				// 如果不想关闭，而单是清除loading状态，需要通过ref手动调用方法
				//this.$refs.uModal.clearLoading();
				this.layer = true;
				this.topText = '太棒了，你已经累计打卡' + '<view style="color:red">' + this.title[index].title + this.title[index]
					.index + '次</view>' +
					'坚持就是胜利！别忘了进入的其他健康联系';
				this.title[index]
					.index++
				this.title[index]
					.topTextnumber = this.title[index]
					.topTextnumber + 17
			},
			//随机出现圆圈
			createdBalls() {
				let count = this.maxCount
				console.log(this.maxCount);
				const showHeight = 200 //限制钻石生成区域高度
				const showWidth = this.client - 90
				console.log(this.client);
				while (count > 0) {
					const row = Math.floor(Math.random() * showHeight)
					const col = Math.floor(Math.random() * showWidth)
					if (this.randomArr.length === 0) {
						this.randomArr.push({
							left: col,
							top: row
						})
						count -= 1
					} else {
						const noOverlap = this.randomArr.every(v => Math.hypot(v.left - col, v.top - row) >
							100) //这里的主要目的就是来保证每次随机生成的点确定的圆的位置不会有重叠
						if (noOverlap) {
							this.randomArr.push({
								left: col,
								top: row
							})
							count -= 1
						}
					}
				}
			},
			//点我开启的代码
			turn(index) {
				this.show = true
				this.number = index

			},
			breatheLight() {
				//呼吸灯
				var animation = uni.createAnimation({
					duration: 2500,
					timingFunction: 'ease-in-out'
				})
				if (this.flag) {
					animation.scale(0.8, 0.8).step()
					this.animationData = animation.export()
				} else {
					animation.scale(1, 1).step()
					this.animationData = animation.export()
				}
			},
		}
	}
</script>
<style lang="scss">
	@import './bubble.css'
</style>
