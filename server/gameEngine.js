'use strict';

var _ = require('lodash');

function startGame (game) {
    var a = 30;
    var decisionObject = {
        id: 1,
        options: [
            {id: 1, name: 'Multiply'},
            {id: 2, name: 'Add'}
        ]
    };
    _.each(game.players, function (player) {
        player.socket.emit('gameStart');
    });
    game.players[0].socket.emit('decision', decisionObject);
}



exports.startGame = startGame;