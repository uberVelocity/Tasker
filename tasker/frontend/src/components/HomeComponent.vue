<template>
  <div>
    <nav class="nav-wrapper white z-depth-0">
      <button class="waves-effect waves-light btn" @click="goAbout">About</button>
      <button class="waves-effect waves-light btn" @click="goServers">Servers</button>
      <form action>
        <ul class="right">
          <li>
            <input type="text" placeholder="Username" />
          </li>
          <li>
            <input type="password" placeholder="Password" />
          </li>
          <li>
            <button class="z-depth-0 waves-effect waves-light btn login">Log in</button>
          </li>
        </ul>
      </form>
    </nav>
    <div class="row">
      <div class="col s7">
        <img src="../assets/undraw_through_the_window_51ew.svg" alt class="responsive-img" />
      </div>
      <div class="col s5">
        <h2>Run tasks. Smartly.</h2>
        <h4>Join Tasker to run your tasks today!</h4>
        <br/>
        <button class="z-depth-0 btn waves-effect waves-light sign">Sign up</button>
        <br>
        <button class="z-depth-0 btn waves-effect waves-light loginunder">Log in</button>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "HomeComponent",
  data() {
    return {
      isConnected: "false",
      socket: io("localhost:4001")
    };
  },
  methods: {
    goAbout() {
      this.$router.push("/about");
    },
    goServers() {
      this.$router.push("/servers");
    },
    getHistory(e) {
      e.preventDefault();

      this.socket.emit("HELLO_MESSAGE", {
        message: "hello"
      });
    }
  }
};
</script>

<style scoped>
div.container {
  max-width: 100%;
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
  margin: 2px;
  text-transform: none;
  border-radius: 20px;
  padding: 0px 20px;
}

.sign {
    border-radius: 20px;
    padding: 0px 180px;
    text-transform: none;
    font-weight: bold;
}

.loginunder {
    border-radius: 20px;
    margin: 8px;
    text-transform: none;
    font-weight: bold;
    background-color: white;
    color: #6c63ff;
    border: 1px solid #6c63ff;
    padding: 0px 180px;
}

.login {
    background-color: #6c63ff;
    margin: 20px;
    border-radius: 50px;
    text-transform: none;
    background-color: white;
    border: 1px solid #6c63ff;
    color: #6c63ff;
    font-weight: bold;
}

.btn:hover {
  background-color: #352fa1;
  text-transform: none;
}

.login:hover {
    background-color: #e4e3ff;
}


.loginunder:hover {
    background-color: #e4e3ff;
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