import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)

const router = new Router({
  // ヒストリモードはハッシュがつかなくなる ※mod_rewrite等が必要
  // mode: 'history',
  // サブディレクトリがある場合ベースに設定する
  base: '/vue-test/',
  routes: [
    {
      path: '/',
      component: require('@/views/Home'),
      meta: { root: true }
    },
    {
      path: '/member',
      component: require('@/views/Member'),
      meta: { root: true, requiresAuth: true },
      // ネストされたルート
      children: [
        {
          path: '',
          name: 'member-list',
          component: require('@/views/Member/List')
        },
        {
          path: ':id',
          name: 'member-detail',
          component: require('@/views/Member/Detail'),
          props: route => ({ id: Number(route.params.id) })
        }
      ]
    }
  ]
})

const nextAuth = (to, from, next) => {
  // 認証が必要なページでログイン情報が無ければリダイレクト
  if (store.getters['auth/user'].auth) {
    next()
  } else {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    })
  }
}

router.beforeEach((to, from, next) => {
  // ローディング用のオーバーレイを付ける
  if (to.name !== 'member-detail') store.commit('view/start')
  // 親ルートを含めて認証が必要かを確認
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/init'] !== true) {
      // まだ認証していなければ init が更新されるのを監視
      const unwatch = store.watch((state, getters) => getters['auth/init'], () => {
        nextAuth(to, from, next)
        unwatch()
      })
    } else {
      // 認証済みならすぐ確認
      nextAuth(to, from, next)
    }
  } else {
    next()
  }
})

// ローディング用のオーバーレイを消す
router.afterEach((to, from) => {
  store.commit('view/end')
})

export default router
