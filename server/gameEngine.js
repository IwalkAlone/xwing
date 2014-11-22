'use strict';

var _ = require('lodash');
var gameStateInitializer = require('./state');

function startGame (game) {
    var gameState = gameStateInitializer.init(game);

    _.each(gameState.players, function (player) {
        player.socket.emit('gameStart');
    });

    gameState.start();
}

module.exports.startGame = startGame;