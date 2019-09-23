const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_LOCALDOCKER_CONNECT, {
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

app.use('/api/servers', servers);
app.use('/api/user', auth);

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));