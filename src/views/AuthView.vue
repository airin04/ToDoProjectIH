<template>
  <div class="form-container">
    <form @submit='handleSignUp' class="sign-up-form">
      <h1>New here? Sign Up!</h1>
      <label for='email'>
        Email
        <input type='email' id='email' name='email' v-model='email'>
      </label><br>
      <label for='password'>
        Password
        <input type='password' id='password' name='password' v-model='password' />
      </label><br>
      <label for='confirm-password'>
        Confirm Password
        <input type='password' id='password2' name='password2' v-model='password2' />
      </label>
      <input type='submit' />
    </form>
    <form @submit='handleSignIn' class="sign-in-form">
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
  </div>
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
      password2: '',
    };
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      this.signUp(this.email, this.password);
    },
    matchPassword() {
      if (this.password !== this.password2) {
        alert('Oops! Your passwords don`t match.');
      } else {
        alert('Password created successfully.');
      }
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

<style>

.form-container {
  display: flex;
  flex-direction: row;
  align-content: space-around;
  width: 80%;
}

.sign-up-form {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 50%;
}

.sign-in-form {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 50%;
}
</style>
