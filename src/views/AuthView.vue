<template>
  <h1>This is the sign up/sign in view</h1>
  <button @click="handleSignUp">Sign Up!</button>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import userStore from '@/store/user';

export default {
  name: 'AuthView',
  computed: {
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signUp']),
    handleSignUp() {
      const sampleData = {
        email: 'irene@example.com',
        password: 'prueba1234',
      };
      this.signUp(sampleData.email, sampleData.password);
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
