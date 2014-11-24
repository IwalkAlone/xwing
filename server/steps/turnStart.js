'use strict';

var q = require('q');

function turnStart(state) {
    state.turn += 1;
    state.log('Turn ' + state.turn);
    return state;
}

module.exports = turnStart;