'use strict';

var socket = require('../../socket');

var lastStateUpdate;

socket.on('stateUpdate', function (data) {
    if (!data) {
        return;
    }
    lastStateUpdate = data;
    for (var i = 0; i <= 100; i += 1) {
        lastStateUpdate.log.push({timestamp: i, message: i});
    }
    console.log(lastStateUpdate);
});

var prototype = {
    get state() {
        return lastStateUpdate.state;
    },

    get log() {
        return lastStateUpdate.log;
    }
};

module.exports = prototype;