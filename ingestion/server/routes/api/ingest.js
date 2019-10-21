const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('something hit me');
    res.status(200).json({
        response: 'INGESTION SERVICE: received data...'
    }).send();
});

module.exports = router;
