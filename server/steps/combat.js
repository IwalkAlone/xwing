'use strict';

function combat(state, stepEnd) {
    state.log('Turn ' + state.turn + ' Combat ');
    stepEnd.resolve();
}

module.exports = combat;