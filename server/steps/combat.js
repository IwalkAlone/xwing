'use strict';

function combat(state, stepEnd) {
    console.log('Turn ' + state.turn + ' Combat ');
    stepEnd.resolve();
}

module.exports = combat;