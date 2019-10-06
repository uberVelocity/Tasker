const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const assert = require('assert');

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

const getAllPowerConsumption = 'SELECT value, ts FROM gwconsumptioncompaction WHERE server=?';

// Get history of GW
router.get('/gw', async (req, res) => {
    let gwHistory = {
        servers: []
    }
    compileServerListWithHistory();
    
    // for (i = 0; i < gwHistory.servers.length; i++) {
    //     console.log(gwHistory.servers[i].server);
    //     console.log('length: ' + gwHistory.servers[i].valuesGw.length);
    //     for (j = 0; j < gwHistory.servers[i].valuesGw.length; j++) {
    //         console.log(gwHistory.servers[i].valuesGw[j]);
    //         console.log(gwHistory.servers[i].valuesTs[j]);
    //     }
    // }
});

async function compileServerListWithHistory() {
    let nthServer = 0;
    let compiledList = [];
    const servers = await getServersListFromMongo();
    for (mongoServer of servers) {
        params = [mongoServer._id.toString()];
        await new Promise((resolve, reject) => {
            cassandraClient.execute(getAllPowerConsumption, params, (result, err) => {
                console.log('printing error: ' + Object.getOwnPropertyNames(err));
                if(err) reject(err)
                let newServer = {
                    server: mongoServer._id.toString(),
                    valuesGw: [],
                    valuesTs: []
                }
                for (i = 0; i < err.rows.length; i ++) {
                    newServer.valuesGw.push(err.rows[i].value);
                    newServer.valuesTs.push(err.rows[i].ts);
                }
                // console.log(newServer.server);
                // console.log(newServer.valuesGw);
                // console.log(newServer.valuesTs);
                compiledList.push(newServer);
                nthServer += 1;
                console.log(compiledList[0]);
                resolve()
            })
        }).then(
            response => {
                console.log('!!!!!@@@@@length of compiledList after shit: ' + compiledList.length);

            },
            reason => {

            }
        );
    }
    
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

module.exports = router;