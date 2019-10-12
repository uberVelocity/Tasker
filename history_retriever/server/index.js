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

const users = [];
const connections = [];

server.listen(port, () => console.log(`History retriever operational on port ${port}`));

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(`a user has connected: ${connections.length} connected`);
    
    socket.on('HELLO_MESSAGE', (data) => {
        console.log('received hello message from the front-end with message: ' + data.message);
    });

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket, 1));
        console.log(`a user has disconnected: ${connections.length} connected`);
    });
});
