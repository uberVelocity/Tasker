const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

const localDatacenter = 'datacenter1';
const cassandra = require('cassandra-driver');
const contactPoints = ['172.17.0.3', '172.17.0.3', '172.17.0.3'];
const loadBalancingPolicy = new cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter); 
const clientOptions = {
   policies : {
      loadBalancing : loadBalancingPolicy
   },
   contactPoints: contactPoints,
   authProvider: new cassandra.auth.PlainTextAuthProvider('admin', 'q1w2e3r4'),
   keyspace:'co2'
};
const cassandraClient = new cassandra.Client(clientOptions);

const app = express();

dotenv.config();

const port = process.env.PORT || 3001;

// Inserts at every second the value of each server into the database
async function generateCo2() {
    const getQuery = 'SELECT * FROM co2consumption';
    cassandraClient.execute(getQuery, (err, result) => {
        const firstly = result.first();
        console.log(`The id of the get is ${firstly.id}. The value: ${firstly.value}.`);
    });
    const servers = await getServersListFromMongo();
    // For each server in the server list, generate a CO2 emission value and insert it
    // in the database.
    servers.forEach(server => {
        // Use server ID to INSERT value of CO2 and timestamp to corresponding servers
        const serverId = server._id;
        const co2Value = Math.random();
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