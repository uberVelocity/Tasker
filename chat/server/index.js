const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4001;

const connections = [];

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(`a user has connected: ${connections.length} connected`);

    socket.on('disconnect', (data) => {
        connections.splice(connections.indexOf(socket, 1));
        console.log(`a user has disconnected: ${connections.length} connected`);
    });

    // Send message
    socket.on('send message', (data) => {
        console.log(data.message);
        io.sockets.emit('new message', {
            message: data.message,
            sender: data.sender
        });
    });
});

server.listen(port, () => console.log(`Chat server operational on port ${port}`));


