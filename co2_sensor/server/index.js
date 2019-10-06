const express = require('express');
const mongodb = require('mongodb');

const app = express();

const port = process.env.PORT || 3001;

// Inserts at every second the value of each server into the database
async function generateCo2() {
    console.log(`Server:${Math.random()}, Emissions:${Math.random()}`);
    const servers = await getServersListFromMongo();
    // For each server in the server list, generate a CO2 emission value and insert it
    // in the database.
    servers.forEach(server => {
        // Use server ID to INSERT value of CO2 and timestamp to corresponding servers
        const serverId = server._id;
        console.log(serverId);
    });
}

async function getServersListFromMongo() {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/tasker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    const connection = client.db('tasker').collection('servers');
    const servers = await connection.find({}).toArray();
    return servers;
}

setInterval(generateCo2, 1000);

app.listen(port, () => console.log(`Carbon dioxide sensor started on port ${port}`));