const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const history = require('./routes/api/history');

app.use('/api/history', history);

const port = process.env.PORT || 4001;



app.listen(port, () => console.log(`History retriever operational on port ${port}`));