import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: require('@/components/Home')
    },
    {
      path: '/member',
      component: require('@/components/member.vue'),
      children: [
        {
          path: '/',
          component: require('@/components/member/List')
        },
        {
          path: ':id',
          name: 'member-detail',
          component: require('@/components/member/Detail')
        }
      ]
    }
  ]
})
