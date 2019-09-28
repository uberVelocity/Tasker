const express = require("express");
const mongodb = require("mongodb");
const router = express.Router();

const cassandra = require('cassandra-driver');
const tasksKeySpace = "tasks";
const tasksTableKey = "tasks";
const client = new cassandra.Client({ 
    contactPoints: ['localhost'], 
    localDataCenter: tasksTableKey, 
    keyspace: tasksKeySpace });

// Get Posts (/ refers to /api/servers)
router.get('/', async (req, res) => {
    const servers = await loadServersCollection();

    //Select query for Cassandra.
    query = 'SELECT name, runtime, start, deadline FROM ' + tasksTableKey;
    client.stream(query, [ tasksKeySpace ])
        .on('readable', function () {
            // 'readable' is emitted as soon a row is received and parsed
            let row;
            while (row = this.read()) {
                console.log('name %s, runtime %s, start %s , deadline %s', row.name, row.runtime, row.start, row.deadline);
            }
        })
        .on('end', function () {
            console.log('end');// Stream ended, there aren't any more rows
        })
        .on('error', function (err) {
            console.log('err');// Something went wrong: err is a response error from Cassandra
        });

    res.send(await servers.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const servers = await loadServersCollection();
    await servers.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    //
    const query = 'INSERT INTO ' + tasksTableKey + '(id, name, runtime, start, deadline) VALUES (?, ?, ?, ?)';
    const params = [2,'test2', 3000, new Date(2019, 9, 29), new Date(2019, 9, 30)];

    client.execute(query, params, { prepare: true }, function (err) {
        assert.ifError(err);
        //Inserted in the cluster
    });
    
    return res.status(201).send();
});

// Delete Posts
router.delete('/:id', async (req, res) => {
    const servers = await loadServersCollection();
    await servers.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();

});

// Connect to posts collection
async function loadServersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017-27019/tasker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    return client.db('tasker').collection('servers');
}

module.exports = router;
