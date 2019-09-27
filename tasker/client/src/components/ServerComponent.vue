<template>
  <div class="container">
    <div class="nav">
        <button class="waves-effect waves-default btn" @click="goHome">Home</button>
        <button class="waves-effect waves-light btn" @click="goAbout">About</button>
        <button class="waves-effect waves-light btn" @click="goLogin">Login</button>
        <button class="waves-effect waves-light btn" @click="goRegister">Register</button>
    </div>
    <h1>All servers</h1>
    <!-- CREATE SERVER HERE -->
    <div class="create-server">
      <label for="create-server">Say Something...</label>
      <input type="text" id="create-server" v-model="text" text-darken-2 placeholder="Add a server">
      <button class="waves-effect waves-light btn" v-on:click="createServer">Add</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="servers-container">
      <div class="server"
      v-for="(server, index) in servers"
      v-bind:item="server"
      v-bind:index="index"
      v-bind:key="server._id"
      v-on:dblclick="deleteServer(server._id)"
      >
      {{ `${server.createdAt.getDate()}/${server.createdAt.getMonth()}/${server.createdAt.getYear()}` }}
      <p class="text white-text">{{server.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ServerService from '../services/ServerService';

export default {
  name: 'ServerComponent',
  data() {
    return {
      servers: [],
      error: '',
      text: ''
    }
  },
  async created() {
    try {
      this.servers = await ServerService.getServers();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createServer() {
      await ServerService.insertServer(this.text);
      this.servers = await ServerService.getServers();
    },
    async deleteServer(id) {
      await ServerService.deleteServer(id);
      this.servers = await ServerService.getServers();
    },
    goHome() {
      this.$router.push('/');
    },
    goAbout() {
      this.$router.push('/about');
    },
    goLogin() {
      this.$router.push('/login');
    },
    goRegister() {
      this.$router.push('/register');
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.server {
  position: relative;
  border: 1px solid #6C63FF;
  background-color: #6C63FF;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

button {
  background-color: #6C63FF
}
.btn:hover {
  background-color: lightgrey;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

</style>
