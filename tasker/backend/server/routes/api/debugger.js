const express = require('express');
const router = express.Router();

router.post('/log', (req, res) => {
    console.log('debugger: ');
    console.log(req.body.message);
    res.status(200).send();
});

router.get('/number', (req, res) => {
    console.log('generating number');
    res.status(200).json({
        random: Math.random()
    }).send();
});

module.exports = router;
