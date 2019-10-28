const express = require('express');
const router = express.Router();

router.post('/log', (req, res) => {
    console.log('debugger: ');
    console.log(req.body.message);
    res.status(200).send();
});

module.exports = router;
