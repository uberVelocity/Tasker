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
router.post('/pizza', (req, res) => {
    res.status(200).json({
        text: 'newTitle'
    });
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
    const client = await mongodb.MongoClient.connect('mongodb://mongo-service:27017/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    return client.db('admin').collection('servers');
}

module.exports = router;
