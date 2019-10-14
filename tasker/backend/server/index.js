const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// Middle ware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Connect to DB
mongoose.connect('mongodb://mongo-node:27017/tasker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'));

// Import routes
const servers = require('./routes/api/servers');
const auth = require('./routes/api/auth');
const about = require('./routes/api/about');
const debug = require('./routes/api/debugger');
const info = require('./routes/api/info');

app.use('/api/servers', servers);
app.use('/api/user', auth);
app.use('/api/about', about);
app.use('/api/debugger', debug);
app.use('/api/info', info);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
