<template>
  <h1>This is the sign up/sign in view</h1>
  <form @submit='handleSignUp'>
    <h1>New here? Sign Up!</h1>
    <label for='email'>
      Email
      <input type='email' id='email' name='email' v-model='email'>
      </label><br>
    <label for='password'>
      Password
      <input type='password' id='email' name='password' v-model='password' />
      </label>
    <input type='submit' />
  </form>
  <form @submit='handleSignIn'>
    <h1>Already a user? Sign In</h1>
    <label for='email'>
      Email
      <input type='email' id='email' name='email' v-model='email'>
      </label><br>
    <label for='password'>
      Password
      <input type='password' id='email' name='password' v-model='password' />
      </label>
    <input type='submit' />
  </form>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      this.signUp(this.email, this.password);
    },
    ...mapActions(userStore, ['signIn']),
    handleSignIn() {
      this.signIn(this.email, this.password);
    },
  },
  watch: {
    user() {
      if (this.user) {
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>
