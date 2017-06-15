import Vue from 'vue'
import Router from 'vue-router'
import store from '@/vuex'
Vue.use(Router)

const router = new Router({
  // ヒストリモードはハッシュがつかなくなる ※mod_rewrite等が必要
  // mode: 'history',
  // サブディレクトリがある場合ベースに設定する
  base: '/vue-test/',
  routes: [
    {
      path: '/',
      component: require('@/components/PageHome')
    },
    {
      path: '/member',
      component: require('@/components/PageMember'),
      meta: { requiresAuth: true },
      // ネストされたルート
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 認証が必要なページでログイン情報が無ければリダイレクト
    if (store.getters['auth/user'].auth !== true) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
