const express = require('express');
const router = express.Router();

const localDatacenter = 'datacenter1';
const cassandra = require('cassandra-driver');
const contactPoints = ['cassandra-cluster', 'cassandra-cluster', 'cassandra-cluster'];
const loadBalancingPolicy = new cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy(localDatacenter); 

const clientOptionsGw = {
   policies : {
      loadBalancing : loadBalancingPolicy
   },
   contactPoints: contactPoints,
   authProvider: new cassandra.auth.PlainTextAuthProvider('admin', 'q1w2e3r4'),
   keyspace:'tasker'
};

const clientOptionsCo2 = {
    policies : {
        loadBalancing : loadBalancingPolicy
     },
     contactPoints: contactPoints,
     authProvider: new cassandra.auth.PlainTextAuthProvider('admin', 'q1w2e3r4'),
     keyspace:'tasker'
};

const getAllPowerConsumption = 'SELECT value, ts FROM gwconsumptioncompaction WHERE server=?';
const getAllCo2Emissions = 'SELECT value, ts FROM co2consumptioncompaction WHERE server=?';

// Get history of GW
router.post('/gw', async (req, res) => {
    const gwHistory = await compileServerListWithHistory('power', req.body.serverId);
    res.status(200).send(gwHistory);
});

// Get history of CO2 emissions
router.post('/co2', async (req, res) => {
    const co2History = await compileServerListWithHistory('co2', req.body.serverId);
    res.status(200).send(co2History);
});

// Compiles and returns a list of values of a certain property (either CO2 or GW)
// with timestamps from Cassandra FOR ALL SERVERS THAT ARE CURRENTLY IN MONGO (so not ones that have values)
// but have been removed from the database
async function compileServerListWithHistory(requestType, serverId) {
    console.log(`serverId in CompileServerList: ${serverId}`);
    if (requestType === 'power') {
        cassandraClient = new cassandra.Client(clientOptionsGw);
        requestType = getAllPowerConsumption;
    }
    else if (requestType === 'co2') {
        cassandraClient = new cassandra.Client(clientOptionsCo2);
        requestType = getAllCo2Emissions;
    }
    else {
        return 'err';
    }
    const data = {
        timeStamps: [],
        values: []
    }
    params = [serverId.toString()];
    await new Promise((resolve, reject) => {
        cassandraClient.execute(requestType, params, (result, err) => {
            if(err) {
                reject(err);
            }
            let newServer = {
                server: serverId.toString(),
                values: [],
                valuesTs: []
            }
            for (i = 0; i < err.rows.length; i ++) {
                newServer.values.push(err.rows[i].value);
                newServer.valuesTs.push(err.rows[i].ts);
            }
            data.values = newServer.values;
            data.timeStamps = newServer.valuesTs;
            resolve();
        })
    }).then(
        response => {},
        reason => {}
    );

    return data;
}

module.exports = router;