const express = require('express');
const router = express.Router();

router.get('/log', (req, res) => {
    console.log('debugger: ' + req.body.message);
    res.status(200).send();
});

module.exports = router;
