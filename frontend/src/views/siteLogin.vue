<script>
import { AuthService } from '@/apis'

export default {
  data: () => ({
    username: '',
    password: ''
  }),
  methods: {
    rules(name) {
      return [(value) => (value ? true : `You must enter a ${name}`)]
    },
    async reqLogin() {
      const res = await AuthService.login(this.username, this.password)
      if (res.code === 200 && res.data) {
        console.log(res.data.accessToken)
        console.log(res.data.username)
      }
    }
  }
}
</script>

<template>
  <v-sheet width="300" class="mx-auto form">
    <v-form @submit.prevent>
      <v-text-field v-model="username" :rules="rules('username')" label="id" />
      <v-text-field
        v-model="password"
        :rules="rules('password')"
        label="password"
        type="password"
      />
      <v-btn type="submit" block class="mt-2" @click="this.reqLogin()">Login</v-btn>
    </v-form>
  </v-sheet>
</template>

<style>
.form {
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}
</style>
