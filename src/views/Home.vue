<template>
  <div>
    <h1>home</h1>
    <p>状態：{{ message }}</p>
    <div class="content" v-if="!$user.auth" key="login">
      <dl>
        <dt>ID</dt>
        <dd>
          <input type="text" size="20" v-model="email">
        </dd>
        <dt>パスワード</dt>
        <dd>
          <input type="password" size="20" v-model="password">
        </dd>
        <dt></dt>
        <dd>
          <form>
            <button type="button" @click="login">ログイン</button>
          </form>
        </dd>
      </dl>
    </div>
    <div class="content" v-else key="logout">
      <p><button type="button" @click="logout">ログアウト</button></p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Home',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    message() {
      if (this.$user.auth) {
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
