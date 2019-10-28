const express = require('express');
const mongodb = require('mongodb');
const dotenv = require('dotenv');

const PackageService = require('../services/PackageService');

const app = express();

dotenv.config();

const port = process.env.PORT || 4004;

async function getServersListFromMongo() {
    const client = await mongodb.MongoClient.connect('mongodb://mongo-service:27017/admin', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    const connection = client.db('admin').collection('servers');
    const servers = await connection.find({}).toArray();
    return servers;
}


// Checks and consume queues every five seconds
setInterval(PackageService.consumeAndInsertCo2, 5000);
setInterval(PackageService.consumeAndInsertGw, 5000);

app.listen(port, () => console.log(`Packager service started on port ${port}`));