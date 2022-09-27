<template>
  <nav class='home-nav'>
    <img src='@/assets/logo.png' alt='minimalist logo'>
    <button @click='signOut'>x sign out</button>
  </nav>
  <div class='home-container'>
     <div class='input-form-container'>
      <form class='input-bar-container'>
        <label for='task'>
          <input
            type='text'
            id='task'
            name='task'
            v-model='newTask'
            placeholder='add a new task'
          />
        </label>
        <button @click.prevent='addNewTask' class='add-button'></button>
      </form>
    </div>
    <div class='task-table-container'>
      <h1>my tasks:</h1>
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
            <td>
              <button
                @click.prevent='editTask(task.title, task.id)'
                class='edit-button'>
              </button>
              <form v-if='editingTask'>
                <label for='editedTask'>
                <input
                  type='text'
                  id='editedtask'
                  name='editedTask'
                  v-model='editedTask'
                />
                </label>
                <button
                  @click.prevent='finishTaskEdit'
                  class='edit-button'>
                </button>
              </form>
            </td>
            <td>
              <button
                @click.prevent='eliminateTask(task.id)'
                class='delete-button'>
              </button>
            </td>
            <td>
              <button
                @click.prevent='completeTask(isComplete, id)'
                class='check-button'>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
      editedTask: '',
      editingTask: false,
      taskCompleted: false,
      taskId: null,
    };
  },
  computed: {
    ...mapState(taskStore, ['tasks']),
    ...mapState(userStore, ['user']),
  },
  methods: {
    ...mapActions(userStore, ['signOut', 'fetchUser']),
    ...mapActions(taskStore, ['fetchTasks', 'createTask', 'deleteTask', 'modifyTask', 'modifyTaskState']),
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
    editTask(title, id) {
      this.editingTask = true;
      this.editedTask = title;
      this.taskId = id;
    },
    async finishTaskEdit() {
      try {
        await this.modifyTask(this.editedTask, this.taskId);
      } catch (error) {
        console.error(error);
      }
      this.editingTask = false;
    },
    async completeTask(isComplete, id) {
      this.taskCompleted = true;
      try {
        await this.modifyTaskState(isComplete, id);
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
  padding-bottom: 10%;
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

.home-container {
  display: flex;
  justify-content: space-around;
}

button {
  border: transparent;
  background-color: transparent;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center;
}

button:hover {
  background-color: #FDF3EA;
}

.add-button {
  background-image: url('@/assets/add.png');
  background-size: 25px 25px;
}
.edit-button {
  background-image: url('@/assets/edit.png');
}
.delete-button {
  background-image: url('@/assets/delete.png');
}
.check-button {
  background-image: url('@/assets/completed.png');
}

.input-bar-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-table-container {
  background-image: url('@/assets/grid.001.jpeg');
  padding: 50px;
}
</style>
