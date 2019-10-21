const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4003;

app.listen(port, () => console.log(`Ingestion service operational on port ${port}`));

