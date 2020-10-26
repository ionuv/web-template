import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let routes = []

const routerContext = require.context('./', true, /index\.js/)
routerContext.keys().forEach(route => {
  // 如果是根目录的index.js，不处理
  if (route.startsWith('./index')) {
    return
  }
  const routerModule = routerContext(route)
  /**
   * 兼容 import export 和 require module.export 两种规范
   */
  routes = [...routes, ...(routerModule.default || routerModule)]
})

const rotuers = new Router({
  // mode: 'history', //后端支持可开
  routes: routes
})

/** 2019/2/17
 * @Author: 刘宇琳
 * @Desc: 哈希路由时，404页面要放最后
 */
rotuers.addRoutes([{ path: '*', name: '404', redirect: '/404' }])

export default rotuers
