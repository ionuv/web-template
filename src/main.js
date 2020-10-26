/*
 * @Author: Yu lin Liu
 * @Date: 2019-08-22 09:21:26
 * @Description: file content
 */
import Vue from 'vue'
import 'normalize.css/normalize.css'
import './plugins'
import App from './App.vue'
import router from './router'
import store from './store'<% if (lang) {%>
import i18n from './lang'<%}%>
import './icons'
import './utils/permission'
import './utils/errorLog'
import './utils/solution'
import './components/index'
import '@/assets/styles/common.scss'

// 通过 npm run mock 启用mock数据
if (process.env.NODE_ENV === 'mock') {
  require('./mock')
}

if (process.env.NODE_ENV !== 'production') {
  let VConsole = require('vconsole/dist/vconsole.min')
  new VConsole()
}

Vue.config.productionTip = false

new Vue({
  store,
  router,<% if (lang) {%>
  i18n,<%}%>
  render: h => h(App)
}).$mount('#app')
