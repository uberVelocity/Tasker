const express = require('express');
const mongodb = require('mongodb');
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
   keyspace:'gw'
};

const clientOptionsCo2 = {
    policies : {
        loadBalancing : loadBalancingPolicy
     },
     contactPoints: contactPoints,
     authProvider: new cassandra.auth.PlainTextAuthProvider('admin', 'q1w2e3r4'),
     keyspace:'co2'
};

const getAllPowerConsumption = 'SELECT value, ts FROM gwconsumptioncompaction WHERE server=?';
const getAllCo2Emissions = 'SELECT value, ts FROM co2consumptioncompaction WHERE server=?';

// Get history of GW
router.get('/gw', async (req, res) => {
    const gwHistory = await compileServerListWithHistory('power');
    res.status(200).send(gwHistory);
});

// Get history of CO2 emissions
router.get('/co2', async (req, res) => {
    const co2History = await compileServerListWithHistory('co2');
    res.status(200).send(co2History);
});

// Compiles and returns a list of values of a certain property (either CO2 or GW)
// with timestamps from Cassandra FOR ALL SERVERS THAT ARE CURRENTLY IN MONGO (so not ones that have values)
// but have been removed from the database
async function compileServerListWithHistory(requestType) {
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
    let nthServer = 0;
    let compiledList = [];
    const servers = await getServersListFromMongo();
    for (mongoServer of servers) {
        params = [mongoServer._id.toString()];
        await new Promise((resolve, reject) => {
            cassandraClient.execute(requestType, params, (result, err) => {
                if(err) {
                    reject(err);
                }
                let newServer = {
                    server: mongoServer._id.toString(),
                    values: [],
                    valuesTs: []
                }
                for (i = 0; i < err.rows.length; i ++) {
                    newServer.values.push(err.rows[i].value);
                    newServer.valuesTs.push(err.rows[i].ts);
                }
                compiledList.push(newServer);
                nthServer += 1;
                console.log(compiledList[0]);
                resolve()
            })
        }).then(
            response => {},
            reason => {}
        );
    }
    return compiledList;
}

async function getServersListFromMongo() {
    const client = await mongodb.MongoClient.connect('mongodb://mongo-node:27017/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    const connection = client.db('tasker').collection('servers');
    const servers = await connection.find({}).toArray();
    return servers;
}

module.exports = router;