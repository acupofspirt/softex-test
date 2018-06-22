import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../components/App.vue'
import Main from '../components/pages/Main.vue'

Vue.use(VueRouter)

export default function createRouter () {
  return new VueRouter({
    mode: 'history',
    linkActiveClass: 'g-active',
    caseSensitive: true,
    base: '/',
    routes: [
      {
        path: '/',
        component: App,
        children: [{path: '*', component: Main}]
      }
    ],
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) {
        return {selector: to.hash}
      }
      else if (savedPosition) {
        return savedPosition
      }
      else if (to.path === from.path) {
        return undefined
      }

      return {x: 0, y: 0}
    }
  })
}