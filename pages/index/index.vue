<template>
	<view class="calendar-content" v-if="showCalendar">
		<uni-section title="插入模式" type="line"></uni-section>
		<view>
			<uni-calendar class="uni-calendar--hook" :selected="info.selected" :showMonth="false" @change="change"
				:range='range' @monthSwitch="monthSwitch" :startDate="startDate" />
		</view>
		<u-button text="确定" @click="btn" style='width: 200px;height: 50px;'
			color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))">
		</u-button>
		<view>
			<u-modal :show="show" @confirm='show=false'>
				<scroll-view v-for="(size ,index) in content" :key="index" class="text-box">
					<text>{{size}}</text>
				</scroll-view>
			</u-modal>
		</view>
	</view>
</template>
<script>
	import {
		getDays
	} from '../../hoos/day.js'
	import {
		getDate
	} from '../../hoos/week.js'
	import {
		getWeek
	} from '../../hoos/week.js'
	/**
	 * 获取任意时间
	 */
	//根据日期获取星期几
	let weekday = getDays().allDay.filter((item) => {
		if (getWeek(item) == '星期一' || getWeek(item) == '星期三' || getWeek(item) == '星期五') {
			return getWeek(item)
		}
	})
	export default {
		components: {},
		data() {
			return {
				range: true,
				startDate: '',
				show: false,
				showCalendar: false,
				content: '',
				end: '',
				scuss: [],
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				},
			}
		},
		onLoad() {
			//alert(111)
			//先规定开始时间--默认今天之前的日期不能选择;
			//this.end = utils.formatTime(new Date(), 2);
			this.startDate = uni.$u.timeFormat(new Date(), 'yyyy-mm-dd');
			console.log(this.end);
			// this.startDate = utils.formatTime(new Date(), 2);
		},
		onReady() {
			this.$nextTick(() => {
					this.showCalendar = true
				}),
				// TODO 模拟请求异步同步数据
				setTimeout(() => {
					this.info.date = getDate(new Date(), -30).fullDate
					this.info.startDate = getDate(new Date(), -60).fullDate
					this.info.endDate = getDate(new Date(), 30).fullDate
					console.log(getDate(new Date(), -3).fullDate, );
					let a = []
					weekday.forEach(item => {
							let b = {}
							b.date = item,
								this.info.selected.push(b)
						}),
						console.log('-----------', this.info.selected);
					//console.log(this.info.selected);
				})
		},
		methods: {
			//确定框的点击事件
			btn() {
				this.show = true
			},
			confirm() {
				this.show = false
			},
			change(e) {
				console.log('change 返回:', e.fulldate)
				//去除重复的日期
				e.fulldate = e.fulldate.split('-')[0] + '年' + e.fulldate.split('-')[1] + '月' + e.fulldate.split(
					'-')[2] + '日' + '，'
				console.log(e.fulldate);
				if (this.content.indexOf(e.fulldate) == -1) {
					this.scuss.push(e.fulldate)
					console.log(this.scuss);
					this.content = this.scuss
					console.log(this.scuss[0].slice(0, this.scuss[0].length - 1));
				}
				// 模拟动态打卡
				if (this.info.selected.length > 6) return
				this.info.selected.push({
					date: e.fulldate,
					info: '打卡'
				})
			},
			confirm(e) {
				console.log('confirm 返回:', e)
			},
			monthSwitch(e) {
				console.log('monthSwitchs 返回:', e)
			}
		}
	}
</script>

<style lang="scss">
	@import 'index.css'
</style>
