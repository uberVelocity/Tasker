const express = require('express');
const router = express.Router();
const StreamService = require("../../services/StreamService");

// Simulation of ingestion service

// Handling gw consumption
router.post('/gw', async (req, res) => {
    const gwConsumption = req.body.data;
    
    StreamService.streamGw(gwConsumption);
    res.status(201).send();

});

// Handling co2 emissions
router.post('/co2', async (req, res) => {
    const co2Consumption = req.body.data;

    await StreamService.streamCo2(co2Consumption);
    res.status(201).send();
});

module.exports = router;
