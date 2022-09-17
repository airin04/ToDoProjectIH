<template>
  <div class='form-container'>
    <form @submit.prevent='handleSignUp' class='sign-up-form'>
      <h1>New here? Sign Up!</h1>
      <label for='email'>
        Email
        <input
          type='email'
          id='email'
          name='email'
          v-model='email'
        />
      </label>
      <label for='password'>
        Password
        <input
          type='password'
          id='password'
          name='password'
          v-model='password'
        />
      </label>
      <label for='confirm-password'>
        Confirm Password
        <input
          type='password'
          id='password2'
          name='password2'
          v-model='password2'
        />
      </label>
      <input class='submit-button' type='submit' value='>'/>
    </form>
    <form @submit='handleSignIn' class="sign-in-form">
      <h1>Already a user? Sign In</h1>
      <label for='email'>
        Email
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Your email'
          v-model='email'
        />
      </label>
      <label for='password'>
        Password
        <input
          type='password'
          id='email'
          name='password'
          placeholder='Your password'
          v-model='password'
        />
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
      errorMessage: 'Error message',
    };
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    async handleSignUp() {
      if (this.password === this.password2) {
        try {
          await this.signUp(this.email, this.password);
        } catch (error) {
          this.errorMessage = error.message;
        }
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
  position: fixed;
  top: 30%;
  left: 10%;
}

.sign-up-form {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 250px;
  border-right: solid black;
}

.sign-in-form {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 200px;
}

.submit-button {
  background-color: #F5C2FE;
  border-radius: 50%;
  border:none;
  width: 30px;
  height: 30px;
  }
</style>
