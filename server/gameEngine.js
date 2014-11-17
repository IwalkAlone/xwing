'use strict';

var _ = require('lodash');

function startGame (game, socketSrv) {
    var a = 30;
    var decisionObject = {
        id: 1,
        options: [
            {id: 1, name: 'Multiply'},
            {id: 2, name: 'Add'}
        ]
    };
    socketSrv.emit('decision', decisionObject);
}



exports.startGame = startGame;