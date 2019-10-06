const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

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
    let gwHistory = await compileServerListWithHistory();
    res.status(200).send(gwHistory);
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
                compiledList.push(newServer);
                nthServer += 1;
                console.log(compiledList[0]);
                resolve()
            })
        }).then(
            response => {

            },
            reason => {

            }
        );
    }
    return compiledList;
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