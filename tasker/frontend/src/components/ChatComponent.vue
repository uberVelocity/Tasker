<template>
  <div class="container">
    <div class="row">
      <div class="title col s5">
        <h5>Technical chat support</h5>
      </div>
    </div>
    <div class="textarea">
      <label>Display box</label>
      <textarea readonly name="textdisplay" id="textDisplay" cols="30" rows="10" v-model="chatText"></textarea>
      <br />
      <label>Input box</label>
      <textarea name="textinput" id="textInput" cols="30" rows="10" v-model="message"></textarea>
      <button class="waves-effect waves-light btn send" @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import UserService from "../services/UserService";

export default {
  name: "Chat",
  data() {
    return {
      isConnected: "false",
      socket: io("localhost:4001"),
      message: "",
      chatText: ""
    };
  },
  methods: {
    async sendMessage(e) {
      e.preventDefault();
      const userData = await UserService.getInfo();
      const username = userData.data.userData.name;
      this.socket.emit("send message", {
        message: this.message,
        sender: username
      });
      this.message = "";
    }
  },
  mounted: function() {
    this.socket.on("new message", data => {
      this.chatText += "\n";
      this.chatText += `${data.sender}: `
      this.chatText += data.message;
    });
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

.btn:focus {
  background-color: #6c63ff;
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

.login:focus {
  background-color: white;
}

.loginunder:focus {
  background-color: white;
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

.send {
  margin: 20px 0px;
}
</style>