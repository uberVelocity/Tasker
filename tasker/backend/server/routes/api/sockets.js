const server = require('../../index');
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('a user has connected...');

    io.on('disconnect', () => {
        console.log('a user has disconnected...');
    }); 

    
});

module.exports = io;