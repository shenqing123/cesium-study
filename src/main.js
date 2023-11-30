import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
const pinia = createPinia()
import * as echarts from 'echarts'

import vChart from 'vue-echarts'



export const app = createApp(App)
app.use(pinia).use(router)
app.component('v-chart', vChart)
app.mount('#app')
app.config.globalProperties.$echarts = echarts

