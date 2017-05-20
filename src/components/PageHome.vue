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
          <input type="password" size="20" v-model="password">
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

export default {
  name: 'home',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    message() {
      if (this.$store.getters['auth/user'].auth) {
        return 'ログイン中'
      } else {
        return 'ログインしてません'
      }
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    },
    logout() {
      firebase.auth().signOut()
    }
  }
}
</script>

<style scoped>
.content {
  margin: 10px auto;
  max-width: 800px;
}
</style>
