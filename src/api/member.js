// import axios from 'axios'
import { find, maxBy, remove } from 'lodash'

let LastId = 3
const DemoDatabase = [
  { 'id': 1, 'name': 'サーバル', 'lv': 30, 'sort': 2 },
  { 'id': 2, 'name': 'フェネック', 'lv': 20, 'sort': 3 },
  { 'id': 3, 'name': 'アライさん', 'lv': 10, 'sort': 1 }
]

// 疑似遅延用タイマー
const demoTimer = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 100)
  })
}

// 成功の処理
const apiSuccess = (response) => {
  return demoTimer().then(() => {
    if (response.data.status === true) {
      return response.data.entry
    } else {
      return Promise.reject(response.data)
    }
  })
}

// デモ用 mockAPI
const demox = {
  get: (path, arg) => demoTimer().then(() => {
    if (path === '/vue-test/api/member/list') {
      return { data: { status: true, entry: DemoDatabase } }
    } else {
      return { data: { status: true, entry: find(DemoDatabase, o => o.id === arg.id) } }
    }
  }),
  put: (path, arg) => demoTimer().then(() => {
    return { data: { status: true, entry: arg.item } }
  }),
  post: (path, arg) => demoTimer().then(() => {
    const maxSort = maxBy(DemoDatabase, 'sort')
    const newdata = Object.assign({}, arg.item, {
      id: ++LastId,
      sort: maxSort ? maxSort.sort + 1 : 0,
      name: arg.item.name === '' ? 'noname' : arg.item.name,
      lv: arg.item.lv === '' ? 10 : arg.item.lv
    })
    return { data: { status: true, entry: newdata } }
  }),
  delete: (path, arg) => demoTimer().then(() => {
    remove(DemoDatabase, o => o.id === arg.id)
    return { data: { status: true } }
  })
}

// 失敗の処理
const apiError = (error) => Promise.reject(error.message || 'ERROR')

/*
GET    /member/list/:page   リスト取得 最大10件づつ
POST   /member              新規作成
GET    /member/:id          取得
PUT    /member/:id          更新
DELETE /member/:id          削除
*/
export default {
  getMembers: () =>
    demox.get('/vue-test/api/member/list').then(apiSuccess).catch(apiError),
  postMember: (id, item) =>
    demox.post('/vue-test/api/member', { item: item }).then(apiSuccess).catch(apiError),
  getMember: (id) =>
    demox.get(`/vue-test/api/member/${id}`, { id: id }).then(apiSuccess).catch(apiError),
  putMember: (id, item) =>
    demox.put(`/vue-test/api/member/${id}`, { item: item }).then(apiSuccess).catch(apiError),
  deleteMember: (id) =>
    demox.delete(`/vue-test/api/member/${id}`, { id: id }).then(apiSuccess).catch(apiError)
}
