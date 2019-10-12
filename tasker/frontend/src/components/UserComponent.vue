<template>
  <div class="container">
    <div class="row">
      <h5 class="username col s4">Hello {{username}}!</h5>
      <div class="col s8">
        <h5>Welcome to your dashboard!</h5>
      </div>
    </div>
    <div class="row">
      <div class="tasks">
        <div
          class="taskContainer"
          v-for="(task, index) in tasks"
          v-bind:item="task"
          v-bind:index="index"
          v-bind:key="task.name"
          v-on:dblclick="deleteTask(task.name)"
        >{{task.name}}</div>
      </div>
    </div>

    <div class="fixed-action-btn">
      <button class="btn-floating btn-large red" @click="goChat"><i class="large material-icons">chat</i></button>
    </div>
  </div>
</template>

<script>
import UserService from "../services/UserService";

export default {
  name: "User",
  data() {
    return {
      username: "",
      tasks: []
    };
  },
  async created() {
    const userData = await UserService.getInfo();
    this.username = userData.data.userData.name;
    this.tasks = userData.data.userData.tasks;
  },
  methods: {
      goChat() {
          this.$router.push('/chat');
      }
  }
};
</script>

<style scoped>
.username {
}
</style>