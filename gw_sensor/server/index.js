const express = require('express');

const app = express();

const port = process.env.PORT || 2000;

function generateWattagePerServer() {
    console.log(`{Server: ${Math.floor(Math.random())}, {Consumption: ${Math.random()}}}`);
}

setInterval(generateWattagePerServer, 1000);


app.listen(port, () => console.log(`Sensor GW:${port} started`));