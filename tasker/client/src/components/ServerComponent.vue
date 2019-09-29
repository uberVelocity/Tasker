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
      <label class="col s12" for="create-server">Insert a server:</label>
      <input type="text" id="create-server" v-model="text" text-darken-2 placeholder="Server name">
       <div class="input-field col s12">
        <select name="energy-type" id="energy-field" class="form-control" v-model="selectedEnergy" @change="onChangeEnergy()">
          <option value="coal">Coal</option>
          <option value="solar">Solar</option>
          <option value="wind">Wind</option>
          <option value="uranium">Uranium</option>
        </select>
        <label id="energyLabel" class="grey-text text-lighten-2">Energy type</label>
      </div>
      <div class="input-field col s12">
        <select name="location" id="location-field" class="form-control" v-model="selectedLocation" @change="onChangeLocation()">
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="northAmerica">North America</option>
          <option value="southAmerica">South America</option>
          <option value="toto">Toto</option>
        </select>
        <label id="locationLabel" class="grey-text text-lighten-2">Location</label>
        </div>
        <div class="input-field col s12">
          <label>Price/GW: {{ ppgw }}€</label>
        </div>
      <br>
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
      text: '',
      selectedEnergy: '',
      selectedLocation: '',
      ppgw: '0 '
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
      this.text = '';
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
    },
    onChangeEnergy() {
      document.getElementById('energyLabel').style.display = 'none';
      this.computePPGW();
    },
    onChangeLocation() {
      document.getElementById('locationLabel').style.display = 'none';
    },
    computePPGW() {
      switch(this.selectedEnergy) {
        case 'solar':
          this.ppgw = 0.013;
          break;
        case 'wind':
          this.ppgw = 0.009;
          break;
        case 'coal':
          this.ppgw = 0.031;
          break;
        case 'uranium':
          this.ppgw = 0.131;
          break;
        default:
          this.ppgw = 69;
          break;
      }
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
  background-color: #6C63FF;
}
.btn:hover {
  background-color: lightgrey;
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
  color: #6C63FF !important;
  border-bottom: 1px solid #6C63FF !important;
  -webkit-box-shadow: 0 1px 0 0 #6C63FF !important;
  box-shadow: 0 1px 0 0 #6C63FF !important;
}

.btn:focus {
  background-color: #6C63FF;
}
</style>
