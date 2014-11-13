'use strict';

var express = require('express');
var _ = require('lodash');

var games = require('./games');
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
    socketServer.emit('updateGamesList', games.list());
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
    socketServer.emit('updateGamesList', games.list());
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

    socketServer.emit('updateGamesList', games.list());
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
    socket.emit('updateGamesList', games.list());
    console.log('client connected');
});


