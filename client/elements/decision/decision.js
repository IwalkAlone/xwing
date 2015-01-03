'use strict';

var socket = require('../../socket');

var lastDecision;

socket.on('decision', function (data) {
    if (!data) {
        return;
    }

    lastDecision = data;
    console.log(lastDecision);
});

var prototype = {
    get decision () {
        return lastDecision;
    }
};

module.exports = prototype;