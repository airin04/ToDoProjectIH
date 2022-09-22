<template>
  <div class='logo-container'>
    <img src='@/assets/logo.png'
    alt="minimalist logo">
  </div>
  <div class='form-container'>
    <form @submit.prevent='handleSignUp' class='sign-up-form'>
      <h2>register</h2>
      <label for='email'>
        email
        <input
          type='email'
          id='email'
          name='email'
          v-model='email'
        />
      </label>
      <label for='password'>
        password
        <input
          type='password'
          id='password'
          name='password'
          v-model='password'
        />
      </label>
      <label for='confirm-password'>
        confirm password
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
      <h2>sign in</h2>
      <label for='email'>
        email
        <input
          type='email'
          id='email'
          name='email'
          v-model='email'
        />
      </label>
      <label for='password'>
        password
        <input
          type='password'
          id='email'
          name='password'
          v-model='password'
        />
        </label>
      <input class='submit-button' type='submit' value='>' />
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

.logo-container {
  display: flex;
  justify-content: flex-end;
  padding-top: 5%;
  padding-right: 15%;
}

.logo-container > img {
  height: 50px;
}

.form-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  position: fixed;
  top: 30%;
  left: 5%;
}

.sign-up-form {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 250px;
  padding-right:20%;
  border-right: solid #0A0A14;
  border-right-width: thin;
}

.sign-up-form > label {
  align-self: flex-end;
}
.sign-up-form > h2 {
  align-self: flex-end;
}

.sign-in-form {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 200px;
}

.sign-in-form > label {
  align-self: flex-end;
}
.sign-in-form > h2 {
  align-self: flex-end;
}

.submit-button {
  align-self: flex-end;
  background-color: #FF265A;
  color: #ffffff;
  border-radius: 50%;
  border:none;
  width: 30px;
  height: 30px;
  }
</style>
