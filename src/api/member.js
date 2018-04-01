// デモ用 mockAPI
// import axios from 'axios'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import maxBy from 'lodash/maxBy'
import cloneDeep from 'lodash/cloneDeep'

// サーバー処理の代わり
const Database = {
  autoincrement: 3,
  member: [
    { id: 1, name: 'サーバル', lv: 30, sort: 2 },
    { id: 2, name: 'フェネック', lv: 20, sort: 3 },
    { id: 3, name: 'アライさん', lv: 10, sort: 1 }
  ],
  fetch() {
    return { status: true, entry: this.member }
  },
  find(id) {
    return { status: true, entry: find(this.member, o => o.id === id) }
  },
  push(member) {
    const maxSort = maxBy(this.member, 'sort')
    const newdata = Object.assign({}, member, {
      id: ++this.autoincrement,
      sort: maxSort !== undefined ? maxSort.sort + 1 : 1,
      name: member.name === '' ? 'noname' : member.name,
      lv: member.lv === '' ? 10 : member.lv
    })
    this.member.push(newdata)
    return { status: true, entry: newdata }
  },
  update(member) {
    const index = findIndex(this.member, el => el.id === member.id)
    this.member[index] = member
    return { status: true, entry: member }
  },
  delete(id) {
    this.member = this.member.filter(el => el.id !== id)
    return { status: true }
  }
}

// const delay = [0, 0, 400, 1000]
// delay[Math.floor(Math.random() * delay.length)]

// axiosの代わり
const demox = {
  get: (path) => new Promise((resolve, reject) => {
    resolve({ data: cloneDeep(Database.fetch()) })
  }),
  put: (path, arg) => new Promise(resolve => {
    resolve({ data: cloneDeep(Database.update(arg.item)) })
  }),
  post: (path, arg) => new Promise(resolve => {
    resolve({ data: cloneDeep(Database.push(arg.item)) })
  }),
  delete: (path, arg) => new Promise(resolve => {
    resolve({ data: cloneDeep(Database.delete(arg.id)) })
  })
}

// 成功処理
const apiSuccess = response => {
  if (response.data.status === true) {
    return Promise.resolve(response.data.entry)
  } else {
    return Promise.reject(response.data.message)
  }
}
// 失敗処理
const apiError = error => {
  if (typeof error === 'string') {
    return Promise.reject(error)
  } else {
    return Promise.reject('APIに接続できません')
  }
}

export const member = {
  getMembers: () =>
    demox.get('/vue-test/api/member/list').then(apiSuccess).catch(apiError),
  postMember: (id, item) =>
    demox.post('/vue-test/api/member', { item }).then(apiSuccess).catch(apiError),
  putMember: (id, item) =>
    demox.put(`/vue-test/api/member/${id}`, { item }).then(apiSuccess).catch(apiError),
  deleteMember: (id) =>
    demox.delete(`/vue-test/api/member/${id}`, { id }).then(apiSuccess).catch(apiError)
}
