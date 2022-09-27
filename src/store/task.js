// /store/task.js

import { defineStore } from 'pinia';
import supabase from '../supabase/index';

export default defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    },
    async createTask(task) {
      const { data, error } = await supabase
        .from('tasks')
        .insert(task);
      if (error) throw error;
      else { this.tasks.push(data[0]); }
    },
    async modifyTask(title, id) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ title })
        .match({ id });
      if (error) throw error;
      else {
        const taskIndex = this.tasks.findIndex((task) => task.id === data[0].id);
        const taskToUpdate = this.tasks[taskIndex];
        taskToUpdate.title = data[0].title;
      }
    },

    async modifyTaskState(isComplete, id) {
      const { data, error } = await supabase
        .from('tasks')
        .update({ is_complete: isComplete })
        .match({ id });
      if (error) throw error;
      else {
        const taskIndex = this.tasks.findIndex((task) => task.id === data[0].id);
        const taskToUpdate = this.tasks[taskIndex];
        taskToUpdate.is_complete = data[0].is_complete;
      }
    },

    async deleteTask(id) {
      const { data, error } = await supabase
        .from('tasks')
        .delete()
        .match({ id });
      if (error) throw error;
      else {
        const taskIndex = this.tasks.findIndex((task) => task.id === data[0].id);
        this.tasks.splice(taskIndex, 1);
      }
    },
  },
});
