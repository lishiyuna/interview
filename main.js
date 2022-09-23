import App from './App'
import uView from '@/uni_modules/uview-ui'
// 引入 cu-custom 组件。
import cuCustom from './colorui/components/cu-custom.vue'
// #ifndef VUE3
import Vue from 'vue'
Vue.use(uView)
//配置导航栏
Vue.component('cu-custom', cuCustom)

Vue.config.productionTip = false
App.mpType = 'app'
// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
const app = new Vue({

	...App
})
app.$mount()
// #endif
