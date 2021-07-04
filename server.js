var io;
var gameSocket;

//sio - socket io library, socket is the socket object
function initGame(sio, socket) {
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "Connection established!" });

    //Host has host and player events

    //Host Events
    gameSocket.on('hostCreateNewGame', hostCreateNewGame);
    gameSocket.on('hostRoomFull', hostPrepareGame);
    gameSocket.on('hostCountdownFinished', hostStartGame);
    gameSocket.on('hostNextDay', hostNextDay);

    //Player Events
    gameSocket.on('playerJoinGame', playerJoinGame);
    gameSocket.on('playerChoose', playerChoose);
    gameSocket.on('dayResult', dayResult);
    gameSocket.on('finalResult', finalResult);

}

//Host Functions

function hostCreateNewGame() {
    var thisGameId = Math.random() * 100000;
    this.emit('newGameCreated', { gameId: thisGameId, mySocketId: this.id });
    this.join(thisGameId.toString());
};

function hostPrepareGame(gameId) {
    var sock = this;
    var data = {
        mySocketId: sock.id,
        gameId: gameId
    };
    io.sockets.in(data.gameId).emit('beginNewGame', data);
}

