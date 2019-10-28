<template>
  <div class="container">
    <h1>Server dashboard status</h1>

      <div class="row">
        <div class="serverlist">
          <div
          class="server"
          v-for="(server, index) in servers"
          v-bind:item="server"
          v-bind:index="index"
          v-bind:key="server._id"
          v-on:dblclick="deleteServer(server._id)"
        >
          {{ `${server.createdAt.getDate()}/${server.createdAt.getMonth()}/${server.createdAt.getYear()}` }}
          <p class="text white-text">{{server.text}} ID: {{server._id}}</p>
          <div class="energy"><i class="material-icons">flash_on</i>{{`Energy: ${server.energy}`}}</div>
          <div class="location"><i class="material-icons">location_on</i>{{`Location: ${server.location}`}}</div>
          <button class="waves-effect waves-light btn analytics" @click="showCo2(server._id)">Co2</button>
          <button class="waves-effect waves-light btn analytics" @click="showGw(server._id)">Gw</button>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <textarea readonly name="timeStampText" id="timeStampText" cols="30" rows="30" v-model="timeStampText"></textarea>
          <br>
        </div>
        <div class="col s6">
          <textarea readonly name="valuesText" id="valuesText" cols="30" rows="30" v-model="valuesText"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServerService from '../services/ServerService';
import HistoryService from '../services/HistoryService';

export default {

  name: 'Status',
  data() {
    return {
      servers: [],
      serverNames: [],
      timeStamps: [], // Loop through array of timeValues and display one at a time on new line
      values: [], // Loop through array of values and display one at a time on new line
      serverId: 0,
      timeStampText: '',
      valuesText: ''
    };
  },
  methods: {
    async showGw(serverId) {
      this.serverId = serverId;
      const gwConsumption = await HistoryService.getGw(serverId);
      this.timeStamps = gwConsumption.data.timeStamps;
      this.values = gwConsumption.data.values;

      this.formatTimeStamps(gwConsumption.data.timeStamps);
      this.formatValues(gwConsumption.data.values);
    },
    async showCo2(serverId) {
      this.serverId = serverId;
      const co2Consumption = await HistoryService.getCo2(serverId);
      this.timeStamps = co2Consumption.data.timeStamps;
      this.values = co2Consumption.data.values;

      this.formatTimeStamps(co2Consumption.data.timeStamps);
      this.formatValues(co2Consumption.data.values);
    },
    formatTimeStamps(data) {
      this.timeStampText = '';
      data.forEach(value => {
        this.timeStampText += value + '\n';
      });
    },
    formatValues(data) {
      this.valuesText = '';
      data.forEach(value => {
        this.valuesText += value + '\n';
      });
    }
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
  color: #6C63FF !important;
  border-bottom: 1px solid #6C63FF !important;
  -webkit-box-shadow: 0 1px 0 0 #6C63FF !important;
  box-shadow: 0 1px 0 0 #6C63FF !important;
}

.btn:focus {
  background-color: #6C63FF;
}
</style>