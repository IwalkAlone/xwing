'use strict';

var _ = require('lodash');

function startGame (game, socket) {
    var a = 30;
    var decisionObject = {
        id: 1,
        options: [
            {id: 1, name: 'Multiply'},
            {id: 2, name: 'Add'}
        ]
    };
    socket.emit('decision', decisionObject);
    socket.on('decisionResponse', function (socket, obj) {
        console.log(obj);
    });
}



exports.startGame = startGame;