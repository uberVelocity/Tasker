const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


// Get Servers (/ refers to /api/servers)
router.get('/', async (req, res) => {
    const servers = await loadServersCollection();
    res.send(await servers.find({}).toArray());
});

// Debug
router.post('/pizza', async (req, res) => {
    console.log('some text received');
    await res.status(200).json({
        text: 'newTitle'
    }).send();
});

// Add Servers
router.post('/', async (req, res) => {
    const servers = await loadServersCollection();
    await servers.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    
    return res.status(201).send();
});

// Delete Servers
router.delete('/:id', async (req, res) => {
    const servers = await loadServersCollection();
    await servers.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// Connect to servers collection
async function loadServersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb://db-service:27019/tasker', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    return client.db('tasker').collection('servers');
}

module.exports = router;
