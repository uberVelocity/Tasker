const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

const StreamService = require("../services/StreamService");

const app = express();

dotenv.config();

const port = process.env.PORT || 3001;

// Inserts at every second the value of each server into the database
async function generateCo2() {
    console.log('generating co2');
    
    const servers = await getServersListFromMongo();
    // console.log(servers);
    // For each server in the server list, generate a CO2 emission value and insert it
    // in the database.
    if (servers.length > 0) {
        servers.forEach(server => {
            // Use server ID to INSERT value of CO2 and timestamp to corresponding servers
            const serverId = server._id.toString();
            console.log(serverId);
            const co2Value = Math.random();
            params = [serverId, new Date(), co2Value];
            StreamService.streamData(params);
        });
    }
}

// Emulates the sensors onto which they are attached (pretend it is not a database, but a machine that the sensor is attached to)
async function getServersListFromMongo() {
    const client = await mongodb.MongoClient.connect('mongodb://mongo-node:27017/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    const connection = client.db('admin').collection('servers');
    const servers = await connection.find({}).toArray();
    return servers;
}

setInterval(generateCo2, 4000);

app.listen(port, () => console.log(`Carbon dioxide sensor started on port ${port}`));