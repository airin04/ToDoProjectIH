<template>
  <nav class='home-nav'>
    <img src='@/assets/logo.png' alt='minimalist logo'>
    <button @click='signOut'>x sign out</button>
  </nav>
  <div class="home-container">
    <h1>my tasks:</h1>
    <form>
       <label for='task'>
        <input
          type='text'
          id='task'
          name='task'
          v-model='newTask'
          placeholder='add a new task'
        />
      </label>
      <button @click.prevent='addNewTask'>add</button>
    </form>
    <table>
      <thead>
        <tr>
          <td>my tasks</td>
          <td>edit</td>
          <td>delete</td>
          <td>complete</td>
        </tr>
      </thead>
      <tbody v-for='task in tasks' :key='task.id'>
        <tr>
          <td>{{ task.title }}</td>
          <td><button @click.prevent=''>edit</button></td>
          <td><button @click.prevent='eliminateTask(task.id)'>delete</button></td>
          <td><button @click.prevent=''>complete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import taskStore from '@/store/task';
import userStore from '@/store/user';

export default {
  name: 'HomeView',
  data() {
    return {
      errorMessage: 'Error message',
      newTask: '',
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signOut', 'fetchUser']),
    ...mapActions(taskStore, ['fetchTasks', 'createTask', 'deleteTask']),
    addNewTask() {
      if (this.newTask.length === 0) return;
      this.createTask({ title: this.newTask, user_id: this.user.id });
      this.newTask = '';
    },
    eliminateTask(id) {
      try {
        this.deleteTask(id);
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    try {
      await this.fetchTasks();
      await this.fetchUser();
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style>

.home-nav {
  display: flex;
  justify-content: flex-end;
  height: 10%;
  padding: 5%;
  gap: 5%;
}

.home-nav > img {
  height: 30px;
}

.home-nav > button {
  background-color: transparent;
  border: none;
  font-family: Roboto mono;
  font-weight: 400;
  color: #FF265A;
}

</style>
