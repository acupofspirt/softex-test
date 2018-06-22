import Vue from 'vue'
import createRouter from './client/router'

Vue.config.performance = process.env.NODE_ENV !== 'production'

export default function createApp (context) {
  const router = createRouter(),
        app = new Vue({
          router,
          render: h => h('router-view')
        })

  return {app, router}
}