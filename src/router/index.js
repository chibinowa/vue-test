import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  // ヒストリモードはハッシュがつかなくなる ※mod_rewrite等が必要
  mode: 'history',
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
