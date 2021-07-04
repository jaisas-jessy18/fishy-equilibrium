const express = require('express');
var app = express();

var game = require('./server');
app.use(express.static(__dirname + "/public"));

var server = require('http').createServer(app).listen(process.env.PORT || 3000);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("client connected");
    game.initGame(io, socket);
})




/* const express = require('express');
const app = express();
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
const http = require('http');
const serv = http.createServer(app);

const { Server } = require('socket.io');
var fishy = require('./server');
const io = new Server(serv);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


io.sockets.on('connection', function (socket) {
    console.log("Client Connected");
    //fishy.initGame(io, socket);
})

app.listen(port); */