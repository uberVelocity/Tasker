<template>
  <div class="container">
    <div class="nav">
      <button class="waves-effect waves-light btn" @click="goHome">Home</button>
      <button class="waves-effect waves-light btn" @click="goAbout">About</button>
      <button class="waves-effect waves-light btn" @click="goLogin">Login</button>
      <button class="waves-effect waves-light btn" @click="goRegister">Register</button>
      <button class="waves-effect waves-light btn" @click="goStatus">Status</button>
      <button class="waves-effect waves-light btn" @click="goChart">Chart</button>
      <button class="waves-effect waves-light btn right" @click="logout">Log out</button>
    </div>
    <h1>All servers</h1>
    <!-- CREATE SERVER HERE -->
    <div class="create-server">
      <label v-if="err" class="col s12" for="create-server">{{err}}</label>
      <input type="text" id="create-server" v-model="text" text-darken-2 placeholder="Server name" />
      <div class="input-field col s12">
        <select
          name="energy-type"
          id="energy-field"
          class="form-control"
          required
          v-model="selectedEnergy"
          @change="onChangeEnergy()"
        >
          <option value="Coal">Coal</option>
          <option value="Solar">Solar</option>
          <option value="Wind">Wind</option>
          <option value="Uranium">Uranium</option>
        </select>
        <label id="energyLabel" class="grey-text text-lighten-2">Energy type</label>
      </div>
      <div class="input-field col s12">
        <select
          name="location"
          id="location-field"
          class="form-control"
          required
          v-model="selectedLocation"
          @change="onChangeLocation()"
        >
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Africa">Africa</option>
        </select>
        <label id="locationLabel" class="grey-text text-lighten-2">Location</label>
      </div>
      <div class="input-field col s12">
        <label>Price/GW: {{ ppgw }}€</label>
      </div>
      <br />
      <button class="waves-effect waves-light btn addserver" v-on:click="createServer">Add</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="servers-container">
      <div
        class="server"
        v-for="(server, index) in servers"
        v-bind:item="server"
        v-bind:index="index"
        v-bind:key="server._id"
        v-on:dblclick="deleteServer(server._id)"
      >
        {{ `${server.createdAt.getDate()}/${server.createdAt.getMonth()}/${server.createdAt.getYear()}` }}
        <p class="text white-text">{{server.text}}</p>
        <div class="energy">{{`Energy: ${server.energy}`}}</div>
        <div class="location">{{`Location: ${server.location}`}}</div>
        <button class="waves-effect waves-light btn analytics right">Analytics</button>
      </div>
    </div>
  </div>
</template>

<script>
import ServerService from "../services/ServerService";
import DebuggerService from "../services/DebuggerService";

export default {
  name: "ServerComponent",
  data() {
    return {
      servers: [],
      error: "",
      text: "",
      selectedEnergy: "",
      selectedLocation: "",
      ppgw: "0 ",
      err: ""
    };
  },
  async created() {
    try {
      this.servers = await ServerService.getServers(
        localStorage.getItem("authorization") || null
      );
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createServer() {
      if (!this.selectedLocation || !this.selectedEnergy) {
        this.err = "Location and energy of server must be specified";
      } else {
        const serverData = {
          text: this.text,
          energy: this.selectedEnergy,
          location: this.selectedLocation
        };
        await DebuggerService.sendMessage(
          localStorage.getItem("authorization")
        );
        await ServerService.insertServer(
          serverData,
          localStorage.getItem("authorization")
        );
        this.servers = await ServerService.getServers(
          localStorage.getItem("authorization")
        );
        this.text = "";
        this.err = '';
      }
    },
    async deleteServer(id) {
      await ServerService.deleteServer(
        id,
        localStorage.getItem("authorization")
      );
      this.servers = await ServerService.getServers(
        localStorage.getItem("authorization")
      );
    },
    async logout() {
      localStorage.removeItem("authorization");
      this.$router.push("/login");
    },
    goHome() {
      this.$router.push("/");
    },
    goAbout() {
      this.$router.push("/about");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    },
    goStatus() {
      this.$router.push("/dashboard/status");
    },
    goChart() {
      this.$router.push("/chart");
    },
    onChangeEnergy() {
      document.getElementById("energyLabel").style.display = "none";
      this.computePPGW();
    },
    onChangeLocation() {
      document.getElementById("locationLabel").style.display = "none";
    },
    computePPGW() {
      // Hardcoded energy values, maybe should be replaced by actual data.
      switch (this.selectedEnergy) {
        case "solar":
          this.ppgw = 0.013;
          break;
        case "wind":
          this.ppgw = 0.009;
          break;
        case "coal":
          this.ppgw = 0.031;
          break;
        case "uranium":
          this.ppgw = 0.131;
          break;
        default:
          this.ppgw = 69;
          break;
      }
    }
  }
};
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
  border-radius: 7px;
}

.addserver {
  padding: 0px 100px;
  border-radius: 20px;
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

.analytics {
  background-color: #ff5b5f;
}

.btn:focus {
  background-color: #6c63ff;
}
</style>
