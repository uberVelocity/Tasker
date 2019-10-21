const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

const localDatacenter = 'datacenter1';
const cassandra = require('cassandra-driver');
const contactPoints = ['cassandra-cluster', 'cassandra-cluster', 'cassandra-cluster'];
const loadBalancingPolicy = new cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter); 
const clientOptions = {
   policies : {
      loadBalancing : loadBalancingPolicy
   },
   contactPoints: contactPoints,
   authProvider: new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra'),
   keyspace:'co2'
};
const cassandraClient = new cassandra.Client(clientOptions);

const app = express();

dotenv.config();

const port = process.env.PORT || 3001;

const insertCo2Consumption = 'INSERT INTO co2consumptioncompaction(server, ts, value) VALUES(?, ?, ?)';
// Inserts at every second the value of each server into the database
async function generateCo2() {
    
    const servers = await getServersListFromMongo();
    console.log(servers);
    // For each server in the server list, generate a CO2 emission value and insert it
    // in the database.
    if (servers.length > 0) {
        servers.forEach(server => {
            // Use server ID to INSERT value of CO2 and timestamp to corresponding servers
            const serverId = server._id.toString();
            console.log(serverId);
            const co2Value = Math.random();
            params = [serverId, new Date(), co2Value];
            cassandraClient.execute(insertCo2Consumption, params, {prepare: true}, (err) => {
                if(err) {
                    console.log(err);
                }
            });
        });
    }
}

async function getServersListFromMongo() {
    const client = await mongodb.MongoClient.connect('mongodb://mongo-node:27017/tasker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    const connection = client.db('tasker').collection('servers');
    const servers = await connection.find({}).toArray();
    return servers;
}

setInterval(generateCo2, 4000);

app.listen(port, () => console.log(`Carbon dioxide sensor started on port ${port}`));