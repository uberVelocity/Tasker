<template>
  <div class="container">
    <button class="waves-effect waves-light btn" @click="goServers">Servers</button>
    <button class="waves-effect waves-light btn" @click="goRegister">Register</button>
    <h1>Sign in</h1>
    <label>Username</label>
    <input required v-model="email" type="text" placeholder="Email" />
    <br />
    <label>Password</label>
    <input required v-model="password" type="password" placeholder="Password" />
    <button
      class="waves-effect waves-light btn"
      @click="login"
      type="waves-effect waves-default btn"
    >Login</button>
    <br />
    <label class="response" v-if="response">{{response}}</label>
  </div>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      response: ""
    };
  },
  methods: {
    async login() {
      const res = await AuthenticationService.login({
        email: this.email,
        password: this.password
      });

      // Check for authorization header existance
      // Save the token in local storage and redirect
      console.log('setting authorization header');
      const token = res.data.authorization;
      if (token) {
        localStorage.setItem("authorization", token);
        this.$router.push("/servers");
      }
      else {
        this.response = res.data.err; 
      }
    },
    goServers() {
      this.$router.push("/servers");
    },
    goRegister() {
      this.$router.push("/register");
    }
  }
};
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

.response {
  color:#ff5b5f;
}

.btn:focus {
  background-color: #6c63ff;
}
</style>