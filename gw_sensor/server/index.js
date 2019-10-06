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
   keyspace:'gw'
};
const cassandraClient = new cassandra.Client(clientOptions);

const app = express();

dotenv.config();

const port = process.env.PORT || 3002;

const insertGwConsumption = 'INSERT INTO gwconsumptioncompaction(server, ts, value) VALUES(?, ?, ?)';
// Inserts at every second the value of each server into the database
async function generateGw() {
    
    const servers = await getServersListFromMongo();
    // For each server in the server list, generate a gw consumption value and insert it
    // in the database.
    servers.forEach(server => {
        // Use server ID to INSERT value of gw and timestamp to corresponding servers
        const serverId = server._id.toString();
        console.log(serverId);
        const gwValue = Math.random();
        params = [serverId, new Date(), gwValue];
        cassandraClient.execute(insertGwConsumption, params, {prepare: true}, (err) => {
            if(err) {
                console.log(err);
            }
        });
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

setInterval(generateGw, 1000);

app.listen(port, () => console.log(`Gw sensor started on port ${port}`));