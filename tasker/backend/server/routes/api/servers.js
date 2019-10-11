const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const verify = require('../private/verifyToken');

// Get Servers (/ refers to /api/servers)
router.get('/', verify, async (req, res) => {
    const servers = await loadServersCollection();
    res.send(await servers.find({}).toArray());
});

// Debug route
router.post('/pizza', async (req, res) => {
    console.log('some text received');
    await res.status(200).json({
        text: 'newTitle'
    }).send();
});

// Add Servers
router.post('/', verify, async (req, res) => {
    const servers = await loadServersCollection();
    await servers.insertOne({
        text: req.body.serverData.text,
        energy: req.body.serverData.energy,
        location: req.body.serverData.location,
        createdAt: new Date()
    });
    
    return res.status(201).send();
});

// Delete Servers
router.delete('/:id', verify, async (req, res) => {
    const servers = await loadServersCollection();
    await servers.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// Connect to servers collection
async function loadServersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://localhost:27017-27019/tasker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    return client.db('tasker').collection('servers');
}

module.exports = router;
