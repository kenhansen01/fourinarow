"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var path_1 = require('path');
var socketio = require('socket.io');
var index = require('./routes/index');
var player = require('./routes/player');
var game = require('./routes/game');
var gameplay = require('./routes/gameplay');
var port = 3000;
var app = express();
var io = socketio.listen(app.listen(port, function () {
    console.log("Server started on port " + port);
}));
app.set('views', path_1.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path_1.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);
app.use('/api', player);
app.use('/api', game);
app.use('/api', gameplay);
io.sockets.on('connection', function (socket) {
    console.log('client connect');
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});
//# sourceMappingURL=server.js.map