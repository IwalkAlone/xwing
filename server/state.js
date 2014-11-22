'use strict';

var _ = require('lodash');
var Q = require('q');
var stepIterator = require('./steps/stepIterator').create();

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

    state.nextStep = stepIterator.next;
    state.start = function () {
        start(state);
    };

    return state;
}

function start(state) {
    doStep(state);
}

function doStep(state) {
    var stepEnd = Q.defer();
    var stepEndPromise = stepEnd.promise;
    var step = state.nextStep();
    step(state, stepEnd);
    stepEndPromise.then(function () {
        if (state.turn <= 5) {
            doStep(state);
        }
    });

    return stepEndPromise;
}

module.exports.init = init;
