'use strict';

var express = require('express');
var _ = require('lodash');

var games = require('./games');
var players = require('./connectedPlayers');
var gameEngine = require('./gameEngine');

var app = express();

app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/games', function (req, res) {
    res.send(games.list());
});

app.get('/games/create', function (req, res) {
    var hostname = req.query.hostname;
    if (_.isUndefined(hostname)) {
        res.sendStatus(400);
        return;
    }
    games.create(hostname);
    pushGamesUpdate();
    res.sendStatus(200);
});

app.get('/games/join', function (req, res) {
    var playerName = req.query.playername;
    var gameId = req.query.gameid;
    if (_.isUndefined(playerName) || _.isUndefined(gameId)) {
        res.sendStatus(400);
        return;
    }
    games.join(+gameId, playerName);
    pushGamesUpdate();
    res.sendStatus(200);
});

app.get('/games/start', function (req, res) {
    var gameId = req.query.gameid;
    if (_.isUndefined(gameId)) {
        res.sendStatus(400);
        return;
    }

    var game = games.start(+gameId);
    if (!game) {
        res.sendStatus(400);
        return;
    }

    pushGamesUpdate();
    socketServer.emit('gameStart');
    gameEngine.startGame(game, socketServer);

    res.sendStatus(200);
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var socketServer = require('socket.io')(server);
socketServer.on('connection', function (socket) {
    console.log('Client connected');
    socket.on('joinLobby', function (name) {
        var player = {
            name: name,
            socket: socket
        };
        socket.player = player;
        players.add(player);
        socket.emit('updateGamesList', games.list());
        pushPlayersUpdate();
        console.log('Add player, id=' + player.id + ',name=' + player.name);
        
        socket.on('disconnect', function () {
            console.log('Client disconnected, id=' + player.id + ',name=' + player.name);
            players.remove(player);
            pushPlayersUpdate();
        });
    });
});

function pushGamesUpdate() {
    socketServer.emit('updateGamesList', games.list());
}

function pushPlayersUpdate() {
    socketServer.emit('updatePlayersList', players.list());
}