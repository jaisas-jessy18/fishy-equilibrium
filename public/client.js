;
jQuery(function ($) {
    'use strict';

    var IO = {
        // Connects client to the server 
        init: function () {
            IO.socket = io.connect();
            IO.bindEvents();
        },
        //Socket.io listens to the following events emitted by the server and runs the functions
        bindEvents: function () {
            IO.socket.on('connected', IO.onConnected);
            IO.socket.on('newGameCreated', IO.onNewGameCreated);
            IO.socket.on('playerJoinedRoom', IO.playerJoinedRoom);
            IO.socket.on('beginNewGame', IO.beginNewGame);
            IO.socket.on('gameOver', IO.gameOver);
            IO.socket.on('error', IO.error);
        },
        //on successful connection 
        onConnected: function () {
            App.mySocketId = IO.socket.socket.sessionid;
            console.log(data.message);
        },
        // game is created data is an object with gameId and socket id
        onNewGameCreated: function (data) {
            App.Host.gameInit(data);
        },
        // after player joined, waiting screen(diff for host and player) data : player name, game id and socket id
        playerJoinedRoom: function (data) {
            App[App.myRole].updateWaitingScreen(data);
        },
        // begin game after players joined
        beginNewGame: function (data) {
            App[App.myRole].gameCountdown(data);
        },

    }

}($));