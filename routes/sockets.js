var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8888);


function handler (req, res) {
    res.writeHead(200, {'content-type': 'text/plain'});
    res.end('Sockets connected');
}


io.sockets.on('connection', function(socket) {

    // When we receive a move event from a client send it to everyone else
    socket.on('authenticate', function(data) {
        // Broadcasting will send 'move' to every client except the one
        // that originally sent it
        console.log(data);
        socket.broadcast.emit('decision', data);
    });

});