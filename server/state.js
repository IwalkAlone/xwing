'use strict';

var _ = require('lodash');
var q = require('q');
var createLogger = require('./gameLog').create;
var createStepIterator = require('./steps/stepIterator').create;

function init(game) {
    var state = {
        turn: 0,
        players: _.map(game.players, function (player) {
            return player.name;
        })
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
        name: 'TIE Fighter #1',
        x: 40,
        y: 40,
        skill: 3,
        hull: 3,
        atk: 1
    });

    ships.push({
        player: state.players[1],
        id: 3,
        name: 'TIE Fighter #2',
        x: 30,
        y: 40,
        skill: 1,
        hull: 3,
        atk: 1
    });

    ships.push({
        player: state.players[0],
        id: 4,
        name: 'Z-95 Headhunter',
        x: 30,
        y: 20,
        skill: 7,
        hull: 4,
        atk: 1
    });

    state.nextStep = createStepIterator().next;
    state.logger = createLogger();
    state.log = state.logger.log;
    state.start = start;

    function start() {
        doStep();
    }

    function doStep() {
        var statePromise = q(state);
        statePromise.then(state.nextStep()).then(state.nextStep()).then(state.nextStep())
            .then(state.nextStep()).then(state.nextStep()).then(state.nextStep()).then(state.nextStep());
    }

    return state;
}

module.exports.init = init;
