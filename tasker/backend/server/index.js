const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// Connect to DB
mongoose.connect('mongodb://localhost:27017-27019/tasker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to db...');
});

// Middle ware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Import routes
const servers = require('./routes/api/servers');
const auth = require('./routes/api/auth');
const about = require('./routes/api/about');

app.use('/api/servers', servers);
app.use('/api/user', auth);
app.use('/api/about', about);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
