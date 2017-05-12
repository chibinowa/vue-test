import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/vue-test/',
  routes: [
    {
      path: '/',
      component: require('@/components/PageHome')
    },
    {
      path: '/member',
      component: require('@/components/PageMember'),
      children: [
        {
          path: '/',
          component: require('@/components/member/PageList')
        },
        {
          path: ':id',
          name: 'member-detail',
          component: require('@/components/member/PageDetail')
        }
      ]
    }
  ]
})
