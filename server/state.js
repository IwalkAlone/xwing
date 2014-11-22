'use strict';

var _ = require('lodash');

function init(game) {
    var state = {
        turn: 0,
        players: game.players
    };

    var ships = [];
    state.ships = ships;

    ships.push({
        player: state.players[0],
        id: 1,
        name: 'X-Wing',
        x: 20,
        y: 20,
        skill: 2,
        hull: 5,
        atk: 2
    });

    ships.push({
        player: state.players[1],
        id: 2,
        name: 'TIE Fighter',
        x: 40,
        y: 40,
        skill: 3,
        hull: 3,
        atk: 1
    });

    ships.push({
        player: state.players[1],
        id: 3,
        name: 'TIE Fighter',
        x: 40,
        y: 40,
        skill: 1,
        hull: 3,
        atk: 1
    });

    var steps = (function (state) {
        var sequence = [turnStart, combat];
        var index = -1;

        function nextStep() {
            index = (index + 1) % sequence.length;
            return sequence[index];
        }
    })(state);

    state.steps = steps;

    return state;
}


function turnStart(state) {
    state.turn += 1;
}

function combat(state) {

}

function applyDecision(state, decision) {

}

function advanceToDecision(state) {
    var decision = {};
    return decision;
}

