'use strict';

var socket = require('../../socket');

var lastStateUpdate;

socket.on('stateUpdate', function (data) {
    lastStateUpdate = data;
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