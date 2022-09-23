export function getDate(date, AddDayCount = 0) {
	if (!date) {
		date = new Date()
	}
	if (typeof date !== 'object') {
		date = date.replace(/-/g, '/')
	}
	const dd = new Date(date)

	dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期

	const y = dd.getFullYear()
	const m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
	const d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
	return {
		fullDate: y + '-' + m + '-' + d,
		year: y,
		month: m,
		date: d,
		day: dd.getDay()
	}
}

/**
 * 获取任意时间
 */
export function getWeek(dateString) {
	var date;
	if (!dateString) {
		date = new Date();
	} else {
		var dateArray = dateString.split("-");
		date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
	}
	//var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
	//return "星期" + weeks[date.getDay()];
	return "星期" + "日一二三四五六".charAt(date.getDay());
};
