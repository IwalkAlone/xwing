'use strict';

function turnStart(state, stepEnd) {
    state.turn += 1;
    console.log('Turn ' + state.turn);
    stepEnd.resolve();
}

module.exports = turnStart;