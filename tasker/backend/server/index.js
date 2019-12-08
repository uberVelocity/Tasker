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
mongoose.connect('mongodb://mongo-node:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'));

// Import routes
const servers = require('./routes/api/servers');
const auth = require('./routes/api/auth');
const about = require('./routes/api/about');
const debug = require('./routes/api/debugger');
const info = require('./routes/api/info');

// Define routes
app.use('/servers', servers);
app.use('/user', auth);
app.use('/about', about);
app.use('/debugger', debug);
app.use('/info', info);

// Allow server to default to environment port or 5000 in case env absent
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));
