const express = require('express');
const router = express.Router();
const StreamService = require("../../Services/StreamService");

// Simulation of ingestion service

// Handling gw consumption
router.post('/gw', async (req, res) => {
    console.log(`Gw data:${req.body.data}`);
    const gwConsumption = req.body.data;
    StreamService.streamGw(gwConsumption);
    res.status(201).send();

});

// Handling co2 emissions
router.post('/co2', async (req, res) => {
    console.log(`co2 data:${req.body.data}`);
    const co2Consumption = req.body.data;

    await StreamService.streamCo2(co2Consumption);
    res.status(201).send();
});

module.exports = router;
