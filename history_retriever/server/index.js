const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const history = require('./routes/api/history');

app.use('/api/history', history);

const port = process.env.PORT || 4001;


server.listen(port, () => console.log(`History retriever operational on port ${port}`));

io.on('connection', (socket) => {
    console.log(`a user has connected: ${socket.id}`);

    socket.on('HELLO_MESSAGE', (data) => {
        console.log('received hello message from the front-end with message: ' + data.message);
    });

    io.on('disconnect', () => {
        console.log('a user has disconnected...');
    });
});
