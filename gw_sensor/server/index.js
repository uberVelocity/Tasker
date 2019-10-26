const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

const StreamService = require("../services/StreamService");

const app = express();

dotenv.config();

const port = process.env.PORT || 3002;

// Inserts at every second the value of each server into the database
async function generateGw() {

    const servers = await getServersListFromMongo();

    if (servers.length > 0) {
        // For each server in the server list, generate a gw consumption value and insert it
        // in the database.
        servers.forEach(server => {
            // Use server ID to INSERT value of gw and timestamp to corresponding servers
            const serverId = server._id.toString();
            console.log(serverId);
            const gwValue = Math.random();
            params = [serverId, new Date(), gwValue];
            StreamService.streamData(params);
        });
    }
}

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

// setInterval(generateGw, 4000);
// setInterval(async () => {
//     const response = await StreamService.streamData();
//     console.log(response.data.response);
// }, 1000);

app.listen(port, () => console.log(`Gw sensor started on port ${port}`));