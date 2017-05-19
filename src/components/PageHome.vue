<template>
  <div>
    <h1>home</h1>
    <div class="content">
      <p>状態：{{ message }}</p>
      <dl>
        <dt>ID</dt>
        <dd>
          <input type="text" size="20" v-model="email">
        </dd>
        <dt>パスワード</dt>
        <dd>
          <input type="text" size="20" v-model="password">
        </dd>
      </dl>
      <button @click="login">ログイン</button>
      <button @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import firebase from 'firebase'
import { DemoEMail, DemoPassword } from '@/api/firebase.config'

export default {
  name: 'home',
  data() {
    return {
      email: DemoEMail,
      password: DemoPassword,
      message: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    },
    logout() {
      firebase.auth().signOut()
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.message = `${user.email}でログイン中`
      } else {
        this.message = `ログインしてない`
      }
    })
  }
}
</script>

<style scoped>
.content {
  margin: 10px auto;
  max-width: 800px;
}
</style>
