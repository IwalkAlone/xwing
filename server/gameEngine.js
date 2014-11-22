'use strict';

var _ = require('lodash');
var gameStateInitializer = require('./state');

function startGame (game) {
    var gameState = gameStateInitializer.init(game);

    _.each(game.players, function (player) {
        player.socket.emit('gameStart');
    });

    game.socket.emit('initialState', gameState);
    gameState.start();
    setInterval(function () {
        game.socket.emit('logUpdate', gameState.logger.getAll());
        console.log('log update');
    }, 2000);
}

module.exports.startGame = startGame;