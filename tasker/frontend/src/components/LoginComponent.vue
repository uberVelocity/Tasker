<template>
  <div class="container">
    <nav>
      <button @click="goServers">Servers</button>
    </nav>
    <h1>Sign in</h1>
    <label>Username</label>
    <input required v-model="email" type="text" placeholder="Email" />
    <br />
    <label>Password</label>
    <input required v-model="password" type="password" placeholder="Password" />
    <hr />
    <button @click="login" type="waves-effect waves-default btn">Login</button>
    <label>Response: {{response}}</label>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService';
import DebuggerService from '../services/DebuggerService';

export default {
    name: 'Login',
    data() {
      return {
        response: '',
        email: '',
        password: ''
      }
    },
    methods: {
      async login() {
        const res = await AuthenticationService.login({
          email: this.email,
          password: this.password
        });
        await DebuggerService.sendMessage({
          message: 'logging in'
        });
        // await DebuggerService.sendMessage(res);
        await DebuggerService.sendMessage(res.headers['authorization']);
        this.response = res.headers['authorization'];
        localStorage.setItem('authorization', this.response);
      },
      goServers() {
        this.$router.push('/servers');
      }
    }
}
</script>

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
  border: 1px solid #6c63ff;
  background-color: #6c63ff;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

button {
  background-color: #6c63ff;
}
.btn:hover {
  background-color: #352fa1;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

select {
  display: flex;
}

input {
  color: #6c63ff !important;
  border-bottom: 1px solid #6c63ff !important;
  -webkit-box-shadow: 0 1px 0 0 #6c63ff !important;
  box-shadow: 0 1px 0 0 #6c63ff !important;
}

.btn:focus {
  background-color: #6c63ff;
}
</style>